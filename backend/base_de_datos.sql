
-- =========================================================
-- DATABASE CONFIGURATION
-- =========================================================

DROP DATABASE IF EXISTS community_services;

CREATE DATABASE community_services
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE community_services;

SET NAMES utf8mb4;

-- =========================================================
-- TABLE: roles
-- =========================================================

CREATE TABLE roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================================================
-- TABLE: users
-- =========================================================

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    role_id BIGINT UNSIGNED NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    phone VARCHAR(20) NULL,

    profile_photo VARCHAR(255) NULL,

    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,

    last_login TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: password_resets
-- =========================================================

CREATE TABLE password_resets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    token VARCHAR(255) NOT NULL,

    expires_at DATETIME NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_password_resets_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: refresh_tokens
-- =========================================================

CREATE TABLE refresh_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    token TEXT NOT NULL,

    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,

    expires_at DATETIME NOT NULL,

    revoked BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_refresh_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: categories
-- =========================================================

CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,

    icon VARCHAR(255) NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: sectors
-- =========================================================

CREATE TABLE sectors (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    city VARCHAR(100) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: businesses
-- =========================================================

CREATE TABLE businesses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    sector_id BIGINT UNSIGNED NOT NULL,

    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL UNIQUE,

    description TEXT NOT NULL,

    phone VARCHAR(20) NULL,
    whatsapp VARCHAR(20) NULL,

    email VARCHAR(150) NULL,

    address VARCHAR(255) NULL,

    logo VARCHAR(255) NULL,
    cover_image VARCHAR(255) NULL,

    website VARCHAR(255) NULL,
    facebook VARCHAR(255) NULL,
    instagram VARCHAR(255) NULL,

    working_hours TEXT NULL,

    latitude DECIMAL(10,7) NULL,
    longitude DECIMAL(10,7) NULL,

    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,

    approved_by BIGINT UNSIGNED NULL,
    approved_at DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_businesses_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_businesses_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_businesses_sector
        FOREIGN KEY (sector_id)
        REFERENCES sectors(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_businesses_approved_by
        FOREIGN KEY (approved_by)
        REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: business_images
-- =========================================================

CREATE TABLE business_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    business_id BIGINT UNSIGNED NOT NULL,

    image_url VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_business_images_business
        FOREIGN KEY (business_id)
        REFERENCES businesses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: services
-- =========================================================

CREATE TABLE services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    business_id BIGINT UNSIGNED NOT NULL,

    name VARCHAR(150) NOT NULL,

    description TEXT NULL,

    price DECIMAL(10,2) NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_services_business
        FOREIGN KEY (business_id)
        REFERENCES businesses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: reviews
-- =========================================================

CREATE TABLE reviews (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,
    business_id BIGINT UNSIGNED NOT NULL,

    rating TINYINT UNSIGNED NOT NULL,

    comment TEXT NULL,

    is_visible BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_reviews_rating
        CHECK (rating BETWEEN 1 AND 5),

    CONSTRAINT uq_reviews_user_business
        UNIQUE (user_id, business_id),

    CONSTRAINT fk_reviews_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_reviews_business
        FOREIGN KEY (business_id)
        REFERENCES businesses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: review_replies
-- =========================================================

CREATE TABLE review_replies (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    review_id BIGINT UNSIGNED NOT NULL,
    business_id BIGINT UNSIGNED NOT NULL,

    message TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_replies_review
        FOREIGN KEY (review_id)
        REFERENCES reviews(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_review_replies_business
        FOREIGN KEY (business_id)
        REFERENCES businesses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: favorites
-- =========================================================

CREATE TABLE favorites (
    user_id BIGINT UNSIGNED NOT NULL,

    business_id BIGINT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(user_id, business_id),

    CONSTRAINT fk_favorites_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_favorites_business
        FOREIGN KEY (business_id)
        REFERENCES businesses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: reports
-- =========================================================

CREATE TABLE reports (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    reporter_user_id BIGINT UNSIGNED NOT NULL,

    business_id BIGINT UNSIGNED NULL,
    review_id BIGINT UNSIGNED NULL,

    reason TEXT NOT NULL,

    status ENUM('pending', 'reviewed', 'resolved')
    DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reports_user
        FOREIGN KEY (reporter_user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_reports_business
        FOREIGN KEY (business_id)
        REFERENCES businesses(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_reports_review
        FOREIGN KEY (review_id)
        REFERENCES reviews(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =========================================================
-- TABLE: audit_logs
-- =========================================================

CREATE TABLE audit_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    table_name VARCHAR(100) NOT NULL,

    action_type ENUM('INSERT', 'UPDATE', 'DELETE')
    NOT NULL,

    record_id BIGINT UNSIGNED NULL,

    old_values JSON NULL,
    new_values JSON NULL,

    action_status ENUM('SUCCESS', 'FAILED')
    DEFAULT 'SUCCESS',

    error_message TEXT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

) ENGINE=InnoDB;

-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_businesses_name
ON businesses(name);

CREATE INDEX idx_businesses_category
ON businesses(category_id);

CREATE INDEX idx_businesses_sector
ON businesses(sector_id);

CREATE INDEX idx_businesses_verified
ON businesses(is_verified);

CREATE INDEX idx_reviews_business
ON reviews(business_id);

CREATE INDEX idx_reviews_user
ON reviews(user_id);

-- =========================================================
-- INITIAL ROLES
-- =========================================================

INSERT INTO roles (name, description)
VALUES
('user', 'Normal platform user'),
('business', 'Business or professional account'),
('admin', 'System administrator');

-- =========================================================
-- AUDIT TRIGGERS
-- =========================================================

DELIMITER $$

-- =========================================================
-- USERS TRIGGERS
-- =========================================================

CREATE TRIGGER trg_users_after_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        new_values
    )
    VALUES (
        'users',
        'INSERT',
        NEW.id,
        JSON_OBJECT(
            'first_name', NEW.first_name,
            'last_name', NEW.last_name,
            'email', NEW.email
        )
    );

END $$

CREATE TRIGGER trg_users_after_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        old_values,
        new_values
    )
    VALUES (
        'users',
        'UPDATE',
        NEW.id,

        JSON_OBJECT(
            'first_name', OLD.first_name,
            'last_name', OLD.last_name,
            'email', OLD.email
        ),

        JSON_OBJECT(
            'first_name', NEW.first_name,
            'last_name', NEW.last_name,
            'email', NEW.email
        )
    );

END $$

CREATE TRIGGER trg_users_after_delete
AFTER DELETE ON users
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        old_values
    )
    VALUES (
        'users',
        'DELETE',
        OLD.id,

        JSON_OBJECT(
            'first_name', OLD.first_name,
            'last_name', OLD.last_name,
            'email', OLD.email
        )
    );

END $$

-- =========================================================
-- CATEGORIES TRIGGERS
-- =========================================================

CREATE TRIGGER trg_categories_after_insert
AFTER INSERT ON categories
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        new_values
    )
    VALUES (
        'categories',
        'INSERT',
        NEW.id,

        JSON_OBJECT(
            'name', NEW.name,
            'slug', NEW.slug
        )
    );

END $$

CREATE TRIGGER trg_categories_after_update
AFTER UPDATE ON categories
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        old_values,
        new_values
    )
    VALUES (
        'categories',
        'UPDATE',
        NEW.id,

        JSON_OBJECT(
            'name', OLD.name,
            'slug', OLD.slug
        ),

        JSON_OBJECT(
            'name', NEW.name,
            'slug', NEW.slug
        )
    );

END $$

CREATE TRIGGER trg_categories_after_delete
AFTER DELETE ON categories
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        old_values
    )
    VALUES (
        'categories',
        'DELETE',
        OLD.id,

        JSON_OBJECT(
            'name', OLD.name,
            'slug', OLD.slug
        )
    );

END $$

-- =========================================================
-- BUSINESSES TRIGGERS
-- =========================================================

CREATE TRIGGER trg_businesses_after_insert
AFTER INSERT ON businesses
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        new_values
    )
    VALUES (
        'businesses',
        'INSERT',
        NEW.id,

        JSON_OBJECT(
            'name', NEW.name,
            'email', NEW.email,
            'phone', NEW.phone
        )
    );

END $$

CREATE TRIGGER trg_businesses_after_update
AFTER UPDATE ON businesses
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        old_values,
        new_values
    )
    VALUES (
        'businesses',
        'UPDATE',
        NEW.id,

        JSON_OBJECT(
            'name', OLD.name,
            'email', OLD.email,
            'phone', OLD.phone
        ),

        JSON_OBJECT(
            'name', NEW.name,
            'email', NEW.email,
            'phone', NEW.phone
        )
    );

END $$

CREATE TRIGGER trg_businesses_after_delete
AFTER DELETE ON businesses
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        old_values
    )
    VALUES (
        'businesses',
        'DELETE',
        OLD.id,

        JSON_OBJECT(
            'name', OLD.name,
            'email', OLD.email,
            'phone', OLD.phone
        )
    );

END $$

-- =========================================================
-- SERVICES TRIGGERS
-- =========================================================

CREATE TRIGGER trg_services_after_insert
AFTER INSERT ON services
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        new_values
    )
    VALUES (
        'services',
        'INSERT',
        NEW.id,

        JSON_OBJECT(
            'name', NEW.name,
            'price', NEW.price
        )
    );

END $$

CREATE TRIGGER trg_services_after_update
AFTER UPDATE ON services
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        old_values,
        new_values
    )
    VALUES (
        'services',
        'UPDATE',
        NEW.id,

        JSON_OBJECT(
            'name', OLD.name,
            'price', OLD.price
        ),

        JSON_OBJECT(
            'name', NEW.name,
            'price', NEW.price
        )
    );

END $$

CREATE TRIGGER trg_services_after_delete
AFTER DELETE ON services
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        old_values
    )
    VALUES (
        'services',
        'DELETE',
        OLD.id,

        JSON_OBJECT(
            'name', OLD.name,
            'price', OLD.price
        )
    );

END $$

-- =========================================================
-- REVIEWS TRIGGERS
-- =========================================================

CREATE TRIGGER trg_reviews_after_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        new_values
    )
    VALUES (
        'reviews',
        'INSERT',
        NEW.id,

        JSON_OBJECT(
            'rating', NEW.rating,
            'comment', NEW.comment
        )
    );

END $$

CREATE TRIGGER trg_reviews_after_update
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        old_values,
        new_values
    )
    VALUES (
        'reviews',
        'UPDATE',
        NEW.id,

        JSON_OBJECT(
            'rating', OLD.rating,
            'comment', OLD.comment
        ),

        JSON_OBJECT(
            'rating', NEW.rating,
            'comment', NEW.comment
        )
    );

END $$

CREATE TRIGGER trg_reviews_after_delete
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN

    INSERT INTO audit_logs (
        table_name,
        action_type,
        record_id,
        old_values
    )
    VALUES (
        'reviews',
        'DELETE',
        OLD.id,

        JSON_OBJECT(
            'rating', OLD.rating,
            'comment', OLD.comment
        )
    );

END $$

DELIMITER ;

