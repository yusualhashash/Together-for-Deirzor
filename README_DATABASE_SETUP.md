# Database Setup Guide - NGO Project

## Step 1: Connect to your Neon database

Open your terminal and run:
\`\`\`bash
psql 'postgresql://neondb_owner:npg_LSJ9mz7VZKTb@ep-solitary-glade-ahdfufar-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
\`\`\`

## Step 2: Create all tables

Copy and paste the content from `scripts/001_init_database.sql` into the psql terminal.

Or run directly:
\`\`\`bash
psql 'postgresql://neondb_owner:npg_LSJ9mz7VZKTb@ep-solitary-glade-ahdfufar-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' < scripts/001_init_database.sql
\`\`\`

## Step 3: Seed initial data

Copy and paste the content from `scripts/002_seed_data.sql` into the psql terminal.

Or run directly:
\`\`\`bash
psql 'postgresql://neondb_owner:npg_LSJ9mz7VZKTb@ep-solitary-glade-ahdfufar-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' < scripts/002_seed_data.sql
\`\`\`

## Step 4: Verify setup

Run these queries to check:
\`\`\`sql
-- Check if tables exist
\dt

-- Check admin user
SELECT * FROM admin_users;

-- Check sectors
SELECT * FROM sectors;

-- Check projects  
SELECT * FROM projects;
\`\`\`

## Default Login Credentials

- **Username**: admin
- **Password**: admin123

## Database Structure Summary

All tables follow this clean pattern:
- `id` - Primary key
- `created_at` - Timestamp
- `updated_at` - Timestamp (where applicable)
- `is_active` - Boolean for soft delete
- `display_order` - Integer for custom sorting

## Admin Panel Sections

Once database is setup, you can manage:

1. **Content** - Site settings, home hero, CTA section
2. **Navigation** - Header menu items
3. **Footer** - Quick links, social media, contact info
4. **Sectors** - Activity areas (التعليم، الصحة، etc.)
5. **Projects** - NGO projects with sector links
6. **Impact Stories** - Success stories
7. **Partners** - Partner organizations
8. **Statistics** - Key metrics
9. **Contact Features** - Contact page cards

All content is fully editable through the admin panel at `/admin/login`.
