delete from m_matchinv;
delete from m_matchpo;
delete from m_costhistory;
-- where mc.m_costdetail_id -- in (select m_costdetail_id from m_costdetail where issotrx = 'Y' );
delete from m_costdetail;
-- where issotrx = 'Y';
delete from c_payselectionline;
delete from c_payselectioncheck;
delete from c_payselection cp;
delete from c_payselectionline;
delete from m_costdetail mc;
-- where issotrx = 'Y' ;
delete from c_invoiceline;
delete from c_allocationline;
delete from c_allocationhdr;
delete from c_bankstatementline;
delete from c_payment;
delete from m_packageline;
delete from m_rmaline;
delete from m_transaction;
delete from m_inoutline;
delete from c_orderline;
-- ol where ol.c_orderline_id not in ( select c_orderline_id from c_invoiceline ) ;
delete from m_package;
delete from m_rma;
delete from m_inout;
delete from c_pospayment;
update c_payment
set c_invoice = null;
update c_payment
set c_order_id = null;
update c_order
set c_payment_id = null;
update c_invoice
set c_cashline_id = null;
update c_order
set c_cashline_id = null;
delete from c_payment;
delete from c_cashline;
delete from c_invoice;
-- where issotrx = 'Y' ; 
delete from c_order;
-- as o where o.c_order_id not in ( select cl.c_order_id from c_orderline as cl  where cl.c_orderline_id not in   )  ;