#!/bin/bash

# Deployment script for Uywakuna Blog to AWS S3
# Usage: ./scripts/deploy-s3.sh [bucket-name]

set -e

# Configuration
BUCKET_NAME=${1:-"uywakuna-blog"}
REGION="us-east-1"

echo "🏗️  Building Uywakuna Blog..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Build the static site
npm run build

echo ""
echo "✅ Build completed!"
echo ""
echo "☁️  Deploying to S3 bucket: $BUCKET_NAME"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if authenticated
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ Not authenticated to AWS. Please run 'asl' or configure AWS credentials."
    exit 1
fi

echo "📤 Uploading static assets (with long cache)..."
aws s3 sync out/ s3://$BUCKET_NAME \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "sitemap*.xml" \
  --exclude "robots.txt" \
  --region $REGION

echo "📤 Uploading HTML files (with shorter cache)..."
aws s3 sync out/ s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.html" \
  --include "sitemap*.xml" \
  --include "robots.txt" \
  --cache-control "public, max-age=3600, must-revalidate" \
  --region $REGION

echo ""
echo "✅ Deployment completed successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 S3 Website URL:"
echo "   http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo ""

# Check if CloudFront is configured
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Comment=='Uywakuna Blog CDN'].Id" \
  --output text 2>/dev/null || echo "")

if [ -n "$DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    echo "   Distribution ID: $DISTRIBUTION_ID"
    
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
      --distribution-id $DISTRIBUTION_ID \
      --paths "/*" \
      --query 'Invalidation.Id' \
      --output text)
    
    echo "   Invalidation ID: $INVALIDATION_ID"
    echo ""
    echo "⏳ CloudFront invalidation in progress..."
    echo "   This may take 5-10 minutes to complete."
else
    echo "ℹ️  No CloudFront distribution found."
    echo "   Configure CloudFront for better performance and HTTPS."
    echo "   See docs/DEPLOYMENT_S3.md for instructions."
fi

echo ""
echo "🎉 All done! Your site is live!"

