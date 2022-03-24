var express = require('express');
var router = express.Router();
var db = require('../dbconnection');

/* GET users listing. */
router.get('/', function(req, res, next) {
  return db.query('select * from mas_dept', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

// router.post('/', function (req, res) {
  
//   return db.query('insert into mas_dept (dept_name) values (?)',[req.body.name], function (err, rows1) {
//     if (err) {
//       console.error('error connecting: ' + err);
//       return res.json(err);
//     }
//     //req.session.destroy(); 
//     return res.json(rows1);
//   });
// });

router.post('/', function (req, res) {
  
  return db.query('insert into mas_user (name,dept_code,emp_type_id,mobile_no,email_id,joining_date,resigning_date,address,machine_ip) values (?,?,?,?,?,?,?,?,?)',[req.body.name,req.body.dept_code,req.body.emp_type_id,req.body.mobile_no,req.body.email_id,req.body.joining_date,req.body.resigning_date,req.body.address,req.body.machine_ip], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});





router.post('/', function (req, res) {
  
  return db.query('insert into mas_dept (dept_name) values (?)',[req.body.name], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});
router.put('/', function (req, res) {
  
  return db.query('insert into mas_dept (dept_name) values (?)',[req.body.name], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});

router.post('/usermas', function (req, res) {
  
  return db.query('insert into user_mas (name, dept_code,mob_no,email_id) values (?,?,?,?)',[req.body.name,req.body.dept_code,req.body.mob_no,req.body.email_id], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});
router.get('/usermas', function(req, res, next) {
  //res.send('respond with a resource');
  return db.query('Select * from user_mas',function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.get('/brand', function(req, res, next) {
  //res.send('respond with a resource');
  return db.query('Select * from brand_mas',function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.get('/hardwares', function(req, res, next) {
  //res.send('respond with a resource');
  return db.query('Select * from hardware_mas',function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.get('/stock', function(req, res, next) {
  //res.send('respond with a resource');
  return db.query('SELECT  s.stock_id,m.dept_name,s.dept,s.received_date,u.name,s.cpu_sno, s.monitor_sno,s.keyboard_sno,s.mouse_sno,b.brand_name,b.brand_id,s.issued_to , s.issued_date, s.marked_no,s.remark,s.i_form_no,s.g_form_no  FROM  stock_db s INNER JOIN mas_dept m ON s.dept=m.dept_code INNER JOIN user_mas u ON s.issued_to=u.user_id INNER JOIN brand_mas b ON s.brand_id=b.brand_id' ,function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.post('/stocks', function (req, res) {
  
  return db.query('insert into stock_db (dept, received_date,cpu_sno, monitor_sno,keyboard_sno,mouse_sno,brand_id,issued_to,issued_date,marked_no,remark,i_form_no,g_form_no) values (?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.dept, req.body.received_date,req.body.cpu_sno, req.body.monitor_sno,req.body.keyboard_sno,req.body.mouse_sno,req.body.brand_id,req.body.issued_to,req.body.issued_date,req.body.marked_no,req.body.remark,req.body.i_form_no,req.body.g_form_no], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});
router.put('/dummy/update', function (req, res) {
  console.log("Rohit ");

  // return db.query('update dummy set dept_id=?, user_id=?, cpu_sno=? ',[req.params.dept_id,req.params.user_id,req.params.cpu_sno], function (err, rows1) {
    return db.query('update dummy set dept_id=?, user_id=?, cpu_sno=? where id=?',[req.body.dept_id,req.body.user_id,req.body.cpu_sno,req.body.id], function (err, rows1) { 
  if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});
router.put('/stocks/update', function (req, res) {
  console.log("Rohit ");

  // return db.query('update dummy set dept_id=?, user_id=?, cpu_sno=? ',[req.params.dept_id,req.params.user_id,req.params.cpu_sno], function (err, rows1) {
    return db.query('Update stock_db set dept=?, received_date=?,cpu_sno=?, monitor_sno=?,keyboard_sno=?,mouse_sno=?,brand_id=?,issued_to=?,issued_date=?,marked_no=?,remark=?,i_form_no=?,g_form_no=? where stock_id=?',[req.body.dept,req.body.received_date,req.body.cpu_sno,req.body.monitor_sno,req.body.keyboard_sno,req.body.mouse_sno,req.body.brand_id,req.body.issued_to,req.body.issued_date,req.body.marked_no,req.body.remark,req.body.i_form_no,req.body.g_form_no,req.body.stock_id], function (err, rows1) { 
  if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});
router.post('/dummy', function (req, res) {
  
  return db.query('insert into dummy (dept_id,user_id,cpu_sno) values (?,?,?)',[req.body.dept_id,req.body.user_id,req.body.cpu_sno], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});
router.get('/dummy', function(req, res, next) {
  //res.send('respond with a resource');
  //console.log(req);
  return db.query('SELECT u.name, m.dept_name,d.cpu_sno,d.id FROM  dummy d INNER JOIN mas_dept m ON d.dept_id=m.dept_code INNER JOIN user_mas u ON d.user_id=u.user_id',function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.put('/stock', function (req, res) {
  
  return db.query('Update stock_db set dept=req.dept, received_date=req.received_date,user_id=req.user_id,cpu_sno=req.cpu_sno, monitor_sno=req.monitor_sno,keyboard_sno=req.keyboard_sno,mouse_sno=req.mouse_sno,brand_id=req.brand_id,issued_to=req.issued_to,issued_date=req.issued_date,marked_no=req.marked_no,remark=req.remark,i_form_no=req.i_form_no,g_form_no=req.g_form_no where stock_id=1 ', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});
router.get('/status', function(req, res, next) {
  //res.send('respond with a resource');
  //console.log(req);
  return db.query('SELECT * from status_mas',function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
// router.get('/receiving_stocks', function(req, res, next) {
//   //res.send('respond with a resource');
//   return db.query('SELECT  r.stock_id,m.dept_name,h.hardware_id,h.hardware_name,r.dept_id,r.received_date,r.cpu_sno, r.monitor_sno,r.keyboard_sno,r.mouse_sno,b.brand_name,b.brand_id FROM  stock_receive_mas r INNER JOIN mas_dept m ON r.dept_id=m.dept_code INNER JOIN status_mas s ON s.status_id=r.status_id INNER JOIN brand_mas b ON r.make_model_id=b.brand_id INNER_JOIN hardware_mas on r.hardware_id=h.h_id' ,function(err,rows1){
//     if(err){
//       return res.json(err);
//     }
//     return res.json(rows1);
//   });
// });

router.get('/receiving_stocks', function(req, res, next) {
  //res.send('respond with a resource');
  return db.query('SELECT r.stock_id,r.iform_id, r.dept_id,r.hardware_id,r.received_date ,r.cpu_sno, r.monitor_sno,r.keyboard_sno,r.mouse_sno,r.make_model_id,r.status_id,b.brand_name,h.h_name,m.dept_name, s.status_name from stock_receive_mas r,hardware_mas h, mas_dept m,status_mas s,brand_mas b WHERE r.dept_id=m.dept_code AND r.hardware_id=h.h_id AND r.status_id=s.status_id AND r.make_model_id=b.brand_id' ,function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});

router.post('/receiving_stocks', function (req, res) {
  
  return db.query('insert into stock_receive_mas (stock_id, dept_id,hardware_id,received_date ,cpu_sno, monitor_sno,keyboard_sno,mouse_sno,make_model_id,status_id) values (?,?,?,?,?,?,?,?,?,?)',[req.body.stock_id, req.body.dept_id,req.body.hardware_id,req.body.received_date,req.body.cpu_sno, req.body.monitor_sno,req.body.keyboard_sno,req.body.mouse_sno,req.body.make_model_id,req.body.status_id], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});


module.exports = router;
