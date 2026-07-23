# Enterprise AWS Cloud Architecture Blueprint — HiddenIndia.online

## AWS Cloud Topology & Traffic Flow

```text
User / Mobile Device
        ↓
Route 53 (DNS Management & Latency Routing)
        ↓
AWS WAF & Shield (DDoS Protection, Bot Prevention)
        ↓
CloudFront CDN (Global Edge Caching for Images, WebP & Static Assets)
        ↓
Application Load Balancer (ALB) [SSL/TLS Termination]
        ↓
EC2 Auto Scaling Group (Dockerized Next.js Containers across 2 Availability Zones)
        ↓
     ┌──┴──────────────────────────────┐
     ↓                                 ↓
Amazon RDS PostgreSQL          Amazon ElastiCache Redis
(Multi-AZ Database)            (In-Memory Cache Layer)
     ↓                                 ↓
Amazon S3 Storage              AWS CloudWatch & Alarms
(Media Assets / User Uploads)  (Monitoring & Metrics)
```

---

## Key Components:

1. **Route 53 & CloudFront CDN**: Fast global delivery with SSL/TLS certificate.
2. **AWS WAF**: Web Application Firewall protecting against SQL Injections, XSS, and automated bots.
3. **Application Load Balancer (ALB)**: Distributes incoming traffic smoothly across healthy EC2 instances.
4. **EC2 Auto-Scaling Group**: Automatically scales container instances from 2 to 20+ nodes based on CPU & Memory spikes.
5. **Amazon RDS PostgreSQL (Multi-AZ)**: High availability relational database with automatic daily snapshots and failover replica.
6. **ElastiCache Redis**: High-speed caching for hot database queries and SEO location pages.
7. **Amazon S3**: High availability object storage for user photos, state banners, and temple galleries.
