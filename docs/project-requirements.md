<!-- 



1. Project Name
B2B Apparel Sourcing Mini Platform

Technology:
Backend:
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- pg

Architecture:
- Modular Architecture
- Controller
- Service
- Route

2. Project-এর মূল উদ্দেশ্য
একজন Buyer apparel product-এর জন্য RFQ তৈরি করবে।

তারপর Supplier সেই RFQ দেখে quotation দেবে।

Buyer বিভিন্ন supplier-এর quotation compare করে একটি quotation select করতে পারবে।

মূল business flow:
Buyer
  │
  │ creates
  ▼
RFQ
  │
  │ receives
  ▼
Quotations
  ▲
  │ submitted by
  │
Supplier

3. Actors
আমাদের system-এ ২টি প্রধান actor থাকবে:
Buyer
Buyer পারবে:
Create RFQ
View own RFQs
Update RFQ
Delete RFQ
View quotations
Compare quotations
Select quotation

Supplier
Supplier পারবে:
View available RFQs
Submit quotation
View submitted quotations
Update quotation
Delete quotation

Admin এই mini project-এর scope-এর বাইরে থাকবে।

কারণ এখন আমাদের লক্ষ্য business flow এবং software engineering practice শেখা, authentication/RBAC না।
4. Main Entities
আমাদের প্রথম version-এ ৪টি প্রধান entity:
Buyer
Supplier
RFQ
Quotation

Relationship:
Buyer
  │
  │ 1:N
  ▼
RFQ
  │
  │ 1:N
  ▼
Quotation
  ▲
  │ N:1
  │
Supplier

5. Business Rules
এগুলো খুব গুরুত্বপূর্ণ। Database বা API design করার আগে একজন engineer সাধারণত এই ধরনের business rules পরিষ্কার করে।
Rule 1
একজন Buyer অনেকগুলো RFQ তৈরি করতে পারবে।
1 Buyer → Many RFQs

Rule 2
একটি RFQ শুধুমাত্র একজন Buyer-এর হবে।
1 RFQ → 1 Buyer

Rule 3
একটি RFQ-এর জন্য অনেক Supplier quotation দিতে পারবে।
1 RFQ → Many Quotations

Rule 4
একটি quotation শুধুমাত্র একটি RFQ-এর জন্য হবে।
1 Quotation → 1 RFQ

Rule 5
একজন Supplier অনেকগুলো quotation দিতে পারবে।
1 Supplier → Many Quotations

Rule 6
একটি quotation শুধুমাত্র একজন Supplier-এর হবে।
1 Quotation → 1 Supplier

6. RFQ Status
RFQ-এর কিছু status থাকবে:
pending
approved
closed
cancelled

যেমন:
Buyer creates RFQ
        ↓
     pending
        ↓
     approved
        ↓
      closed

7. Quotation Status
Quotation-এর status:
pending
selected
rejected

যেমন:
Supplier submits quotation
          ↓
       pending
          │
       ┌──┴──┐
       ▼     ▼
   selected rejected

8. Search / Filter
RFQ list API-তে থাকবে:
Search:
product_name

Filter:
status

Sort:
id / quantity

Pagination:
page
limit

Example:
GET /api/rfqs?search=shirt&status=pending&page=1&limit=5

এখানে আমরা Lesson 26–27-এর concepts ব্যবহার করব।
9. Reporting / Query Requirements
এগুলো project-এর SQL practice-এর জন্য খুব গুরুত্বপূর্ণ।

আমরা API বা service-এর মাধ্যমে এমন queries তৈরি করব:
Buyer-wise RFQ summary
Buyer
Total RFQs
Total Quantity

RFQ-wise quotation count
RFQ
Number of quotations

Cheapest quotation
RFQ
Supplier
Lowest price

Supplier performance
Supplier
Total quotations
Selected quotations

Buyers with high total demand
Buyer
Total quantity > X

এখানে ব্যবহার হবে:
JOIN
GROUP BY
HAVING
COUNT
SUM
MIN
Subquery
CASE
COALESCE

অর্থাৎ Lesson 16–21 project-এর মধ্যে সত্যিকার অর্থে ব্যবহার হবে।
10. Security Requirements
আমাদের mini project-এ authentication implement না করলেও security practice থাকবে।
SQL Injection protection
সব user input:
pool.query(
    'SELECT * FROM rfqs WHERE id = $1',
    [id]
);

Parameterized query দিয়ে যাবে।
Input validation
যেমন:
quantity > 0
email valid
required fields present
page >= 1
limit <= 100

Environment variables
Database credentials:
.env

GitHub-এ যাবে না।
11. Non-Functional Requirements
এগুলোও বড় project-এর আগে জানা ভালো।
Maintainability
Code modular হবে:
buyer/
supplier/
rfq/
quotation/

Performance
প্রয়োজনীয় Foreign Key / search columns-এ index ব্যবহার করব।
Scalability
Business logic controller-এ না রেখে service layer-এ রাখব।
Reliability
Database transaction ব্যবহার করব যেখানে multiple operation একসাথে সফল হওয়া দরকার।
🎯 এখন আমাদের প্রথম Design Document
Project-এর docs folder তৈরি করুন:
b2b-sourcing-api/
│
├── docs/
│
├── src/
├── database/
├── package.json
└── ...

এর মধ্যে একটি file তৈরি করুন:
docs/project-requirements.md

এখানে আজকের requirementগুলো রাখা যাবে।
এরপর কী?
এখন requirements clear।

পরের ধাপে আমরা ERD design করব।

কিন্তু এবার আমি শুধু SQL table লিখে দেব না। আমরা প্রথমে সিদ্ধান্ত নেব:
Buyer-এর কোন fields?
Supplier-এর কোন fields?
RFQ-এর কোন fields?
Quotation-এর কোন fields?

কোনটা Primary Key?
কোনটা Foreign Key?
কোন relationship 1:N?
কোন field nullable?
কোন field unique?


 -->