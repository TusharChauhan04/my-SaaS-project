-- Users Table
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  company_id VARCHAR(36) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_email (email),
  INDEX idx_company_id (company_id)
);

-- Companies Table
CREATE TABLE companies (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  business_type ENUM('agency', 'local') NOT NULL,
  business_field VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  owner_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_owner_id (owner_id),
  INDEX idx_created_at (created_at)
);

-- Team Members Table
CREATE TABLE team_members (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  role ENUM('owner', 'admin', 'member') DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_company_user (company_id, user_id),
  INDEX idx_company_id (company_id)
);

-- SEO Keywords Table
CREATE TABLE seo_keywords (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  keyword VARCHAR(255) NOT NULL,
  current_rank INT,
  previous_rank INT,
  search_volume INT,
  difficulty ENUM('Low', 'Medium', 'High'),
  change_direction ENUM('up', 'down', 'neutral'),
  tracked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_company_id (company_id),
  INDEX idx_keyword (keyword)
);

-- Expenses Table
CREATE TABLE expenses (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  category VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_company_id (company_id),
  INDEX idx_date (date)
);

-- Income/Revenue Table
CREATE TABLE income (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  source VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_company_id (company_id),
  INDEX idx_date (date)
);

-- Content Posts Table
CREATE TABLE content_posts (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content_type ENUM('blog', 'instagram', 'facebook', 'twitter', 'youtube'),
  scheduled_date TIMESTAMP,
  engagement INT DEFAULT 0,
  reach INT DEFAULT 0,
  status ENUM('draft', 'scheduled', 'published', 'archived') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_company_id (company_id),
  INDEX idx_status (status)
);

-- AI Insights Table
CREATE TABLE ai_insights (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  insight_type ENUM('seo_opportunity', 'cost_saving', 'content_trend'),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority ENUM('High', 'Medium', 'Low'),
  potential_value DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_company_id (company_id),
  INDEX idx_created_at (created_at)
);

-- Subscription/Billing Table
CREATE TABLE subscriptions (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  plan ENUM('starter', 'pro', 'enterprise') DEFAULT 'starter',
  status ENUM('active', 'paused', 'cancelled') DEFAULT 'active',
  monthly_price DECIMAL(10, 2),
  start_date DATE NOT NULL,
  end_date DATE,
  next_billing_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  UNIQUE KEY unique_company (company_id),
  INDEX idx_status (status)
);
