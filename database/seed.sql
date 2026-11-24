
-- ============================================
-- B2B Sourcing API
-- Seed Data
-- ============================================


-- ============================================
-- 1. Buyers
-- ============================================

INSERT INTO buyers (id, name, company_name, email)
VALUES
(1, 'Rifat Uddin', 'ABC Fashion Ltd.', 'rifat@abcfashion.com'),
(2, 'Rahim Ahmed', 'Style Wear Ltd.', 'rahim@stylewear.com'),
(3, 'Karim Hasan', 'Modern Apparel Ltd.', 'karim@modernapparel.com');


-- ============================================
-- 2. Suppliers
-- ============================================

INSERT INTO suppliers (id, name, company_name, email)
VALUES
(1, 'Shakil Ahmed', 'Dhaka Garments Ltd.', 'shakil@dhakagarments.com'),
(2, 'Noman Khan', 'Chittagong Textile Ltd.', 'noman@ctextile.com'),
(3, 'Sabbir Hossain', 'Premium Wear Ltd.', 'sabbir@premiumwear.com');


-- ============================================
-- 3. RFQs
-- ============================================

INSERT INTO rfqs (id, buyer_id, product_name, quantity, status)
VALUES
(101, 1, 'Cotton T-Shirt', 5000, 'pending'),
(102, 1, 'Polo Shirt', 8000, 'approved'),
(103, 2, 'Denim Jacket', 3000, 'pending'),
(104, 2, 'Hoodie', 10000, 'pending'),
(105, 2, 'Casual Shirt', 2000, 'closed'),
(106, 3, 'Sports T-Shirt', 7000, 'approved');


-- ============================================
-- 4. Quotations
-- ============================================

INSERT INTO quotations (id, rfq_id, supplier_id, unit_price, status)
VALUES
(1001, 101, 1, 4.50, 'pending'),
(1002, 101, 2, 4.25, 'selected'),
(1003, 102, 2, 5.00, 'selected'),
(1004, 102, 3, 5.25, 'rejected'),
(1005, 103, 1, 12.50, 'pending'),
(1006, 103, 3, 11.75, 'pending'),
(1007, 105, 2, 8.50, 'rejected'),
(1008, 106, 1, 6.25, 'selected');


-- ============================================
-- 5. Sync Identity Sequences
-- ============================================

SELECT setval(
    pg_get_serial_sequence('buyers', 'id'),
    (SELECT MAX(id) FROM buyers),
    true
);

SELECT setval(
    pg_get_serial_sequence('suppliers', 'id'),
    (SELECT MAX(id) FROM suppliers),
    true
);

SELECT setval(
    pg_get_serial_sequence('rfqs', 'id'),
    (SELECT MAX(id) FROM rfqs),
    true
);

SELECT setval(
    pg_get_serial_sequence('quotations', 'id'),
    (SELECT MAX(id) FROM quotations),
    true
);
