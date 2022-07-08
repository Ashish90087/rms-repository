var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
const users = require('../models/users');
const returnedusers = require('../models/returnedusers');
const newstocks = require('../models/newstocks');

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

router.get('/usermas', function(req, res, next) {
  return db.query('Select * from mas_user',function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.get('/brand', function(req, res, next) {
  return db.query('Select * from brand_mas',function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.get('/hardwares', function(req, res, next) {
  return db.query('Select * from hardware_mas',function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.get('/patch_stock', function(req, res, next) {
  return db.query('SELECT s.*,DATE_FORMAT(s.received_date,"%Y-%m-%d") as r_date from stock_receive_mas s' ,function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});

router.get('/patchIssueStocks', function(req, res, next) {
  return db.query('SELECT i.*,DATE_FORMAT(i.issued_date,"%Y-%m-%d") as i_date from issued_details i' ,function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.get('/patchReturnStocks', function(req, res, next) {
  return db.query('SELECT r.*, DATE_FORMAT(r.returned_date,"%Y-%m-%d") as r_date from returned_stock_details r' ,function(err,rows1){
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


router.get('/status', function(req, res, next) {
  return db.query('SELECT * from status_mas',function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});

router.get('/receiving_stocks', function(req, res, next) {
  return db.query('SELECT r.stock_id, r.dept_id,r.hardware_id,r.received_date ,r.cpu_sno, r.monitor_sno,r.keyboard_sno,r.mouse_sno,r.make_model_id,r.i_form_no,r.ilocation,r.status_id,r.remarks,b.brand_name,h.h_name,m.dept_name, s.status_name from stock_receive_mas r,hardware_mas h, mas_dept m,status_mas s,brand_mas b WHERE r.dept_id=m.dept_code AND r.hardware_id=h.h_id AND r.status_id=s.status_id AND r.make_model_id=b.brand_id' ,function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});

router.get('/issuestocks1', function(req, res, next) {
  return db.query('SELECT i.issued_to,u.name, sr.stock_id,i.g_form_no,sr.status_id,i.ilocation,sr.dept_id,m.dept_name, sr.monitor_sno, s.status_id, s.status_name from issued_details i inner join mas_user u on i.issued_to=u.user_id INNER JOIN stock_receive_mas sr ON i.stock_id=sr.stock_id INNER JOIN  status_mas s ON i.status_id=s.status_id INNER JOIN mas_dept m ON sr.dept_id=m.dept_code' ,function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.get('/issuestocks', function(req, res, next) {
  return db.query('SELECT id.*, m.name, DATE_FORMAT(id.issued_date,"%Y-%m-%d") as i_date  from issued_details id INNER JOIN mas_user m ON id.issued_to=m.user_id  ' ,function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});

router.get('/getStocks', function(req, res, next) {
  return db.query('SELECT r.stock_id from stock_receive_mas r' ,function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.get('/stockstoreturn', function(req, res, next) {
  return db.query('SELECT s.*, m.dept_name from stock_receive_mas s INNER JOIN mas_dept m ON s.dept_id=m.dept_code AND s.status_id!=5; ' ,function(err,rows1){
    if(err){
      return res.json(err);
    }
    return res.json(rows1);
  });
});

router.get('/returnstocks', function(req, res, next) {
  return db.query('SELECT r.*, i.issued_to,m.name  FROM returned_stock_details r LEFT JOIN  issued_details i ON r.stock_id=i.stock_id LEFT JOIN mas_user m ON m.user_id=i.issued_to' ,function(err,rows1){
    if(err){
      return res.json(err); 
    }
    return res.json(rows1);
  });
});

router.post('/', function (req, res) {
  
  return db.query('insert into mas_user (name,dept_code,emp_type_id,mobile_no,email_id,joining_date,resigning_date,address,machine_ip,ol_location) values (?,?,?,?,?,?,?,?,?,?)',[req.body.name,req.body.dept_code,req.body.emp_type_id,req.body.mobile_no,req.body.email_id,req.body.joining_date,req.body.resigning_date,req.body.address,req.body.machine_ip,req.body.ol_location], function (err, rows1) {
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
    return res.json(rows1);
  });
});


router.post('/usermas', function (req, res) {
  
  return db.query('insert into mas_user (name, dept_code,mob_no,email_id) values (?,?,?,?)',[req.body.name,req.body.dept_code,req.body.mob_no,req.body.email_id], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    return res.json(rows1);
  });
});

// router.post('/receiving_stocks', function (req, res) {
  
//   return db.query('insert into stock_receive_mas (stock_id, dept_id,hardware_id,received_date ,cpu_sno, monitor_sno,keyboard_sno,mouse_sno,make_model_id,remarks,i_form_no,ilocation,status_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.stock_id, req.body.dept_id,req.body.hardware_id,req.body.received_date,req.body.cpu_sno, req.body.monitor_sno,req.body.keyboard_sno,req.body.mouse_sno,req.body.make_model_id,req.body.remarks,req.body.i_form_no,req.body.ilocation,req.body.status_id], function (err, rows1) {
//     if (err) {
//       console.error('error connecting: ' + err);
//       return res.json(err);
//     }
//     return res.json(rows1);
//   });
// });

router.post('/receiveNewStock', function (req, res) 
{
  
    console.log("Helooo");
    newstocks.receiveNewStock(req.body, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
    console.log("transaction succuessful")
});

router.post('/issueAndUpdateStock', function (req, res) 
{
  
    console.log("Helooo");
    users.issueAndUpdateStock(req.body, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
    console.log("transaction succuessful")
});

router.post('/ReturnAndUpdateStock', function (req, res) 
{
  
    returnedusers.ReturnAndUpdateStock(req.body, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
});

router.post('/returnstocks', function (req, res) {
  
  return db.query('insert into returned_stock_details (stock_id,was_issued_to,returned_date,serial_no,dept_id,status_id,g_form_no,glocation,remarks) values (?,?,?,?,?,?,?,?,?)',[req.body.stock_id,req.body.was_issued_to, req.body.returned_date,req.body.serial_no,req.body.dept_id,req.body.status_id,req.body.g_form_no,req.body.glocation,req.body.remarks], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    return res.json(rows1);
  });
});

router.put('/', function (req, res) {
  
  return db.query('insert into mas_dept (dept_name) values (?)',[req.body.name], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    return res.json(rows1);
  });
});

router.put('/receiving_stocks', function (req, res) {
  console.log("Rohit ");

  // return db.query('update dummy set dept_id=?, user_id=?, cpu_sno=? ',[req.params.dept_id,req.params.user_id,req.params.cpu_sno], function (err, rows1) {
    return db.query('Update stock_receive_mas set dept_id=?,hardware_id=?, received_date=?,cpu_sno=?, monitor_sno=?,keyboard_sno=?,mouse_sno=?,make_model_id=?,status_id=?,i_form_no=?,ilocation=?,remarks=? where stock_id=?',[req.body.dept_id,req.body.hardware_id,req.body.received_date,req.body.cpu_sno,req.body.monitor_sno,req.body.keyboard_sno,req.body.mouse_sno,req.body.make_model_id,req.body.status_id,req.body.i_form_no,req.body.ilocation,req.body.remarks,req.body.stock_id], function (err, rows1) { 
  if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    return res.json(rows1);
  });
});

router.put('/updateStatus', function (req, res) {
  
  return db.query('Update stock_receive_mas set status_id=? where stock_id=?',[req.body.status_id,req.body.stock_id] , function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    } 
    return res.json(rows1);
  });
});
router.put('/issues', function (req, res) {
  
  return db.query('Update issued_details set issued_date=?,marked_no=?,remark=?,stock_id=?,status_id=? where issued_to=?',[req.body.issued_date,req.body.marked_no,req.body.remark,req.body.stock_id,req.body.status_id,req.body.issued_to] , function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    return res.json(rows1);
  });
});
router.put('/returns', function (req, res) {
  
  return db.query('Update returned_stock_details set serial_no=?,dept_id=?,returned_date=?,g_form_no=?,remarks=?  where stock_id=?',[req.body.serial_no,req.body.dept_id,req.body.returned_date,req.body.g_form_no,req.body.remarks,req.body.stock_id] , function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    return res.json(rows1);
  });
});



module.exports = router;
