<!-- 

BUYER
────────────────────────────────
GET    /api/buyers
GET    /api/buyers/:id
POST   /api/buyers
PUT    /api/buyers/:id
DELETE /api/buyers/:id

SUPPLIER
────────────────────────────────
GET    /api/suppliers
GET    /api/suppliers/:id
POST   /api/suppliers
PUT    /api/suppliers/:id
DELETE /api/suppliers/:id

RFQ
────────────────────────────────
GET    /api/rfqs
GET    /api/rfqs/:id
POST   /api/rfqs
PUT    /api/rfqs/:id
DELETE /api/rfqs/:id

GET    /api/rfqs/:id/quotations

BUYER → RFQs
────────────────────────────────
GET    /api/buyers/:id/rfqs

QUOTATION
────────────────────────────────
GET    /api/quotations
GET    /api/quotations/:id
POST   /api/quotations
PUT    /api/quotations/:id
DELETE /api/quotations/:id

BUSINESS ACTION
────────────────────────────────
PATCH  /api/quotations/:id/select
 -->