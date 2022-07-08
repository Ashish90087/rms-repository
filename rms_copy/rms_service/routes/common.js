var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
const common = require("../models/login");
const jwt = require('jsonwebtoken');
// const client = require('twilio')(accountSid, authToken);
//crontab

var cron = require('node-cron');

cron.schedule('00 10 * * *', () => {
  console.log('running a task everday at 10 am**');
  try {
    db.query('select ma.ssl_expiry,ma.url, ma.app_name, ma.app_id from mas_app ma WHERE (ma.ssl_expiry - CURDATE())< 6 AND (ma.ssl_expiry - CURDATE())>0 AND ma.is_notified = 0', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
      }
      //req.session.destroy(); 
      if (rows1) {
  console.log('length**', rows1.length);
        const wa_numbers = [
          {
          wa: '+917550931463',
          accountSid: 'AC0f735bd0b89f91e09bf40df626720a3b',
          authToken: '16be0fe3147fadff518f0eaa1ec360a4'
        }
        ,{
          wa: '+919871042495',
          accountSid: 'AC19ea265578eeb1b8f0944b6fecfb8e5e',
          authToken: '1553fdba68f9aaaa069020452520cdb5'
        }];
        rows1.forEach((element, index) => {
          wa_numbers.forEach(ele => {
          const client = require('twilio')(ele.accountSid, ele.authToken);
            console.log('mesg**to ', ele);
            client.messages 
          .create({ 
             body: 'Your Domain is '+element.url+' And App Name is '+element.app_name+' will Expire on' +element.ssl_expiry, 
            // body: element, 
            from: 'whatsapp:+14155238886',       
             to: 'whatsapp:'+ele.wa 
           }) 
          .then((message) => console.log('msg***',message)) 
          .catch(e => { console.error('Got an error:', e.code, e.message); })
          .done();
          });
  
          if(rows1.length == (index+1)) {
            console.log('update**', index);
            db.query("UPDATE mas_app SET is_notified = 1 WHERE app_id=?",[element.app_id], function (err, rows2) {
              if (err) {
                console.error('error connecting: ' + err);
              }
            })
          }
        });  
      }    
  });
  } catch (error) {
    console.log('error connecting: ' + error);
  }
 
});

var bcrypt = require('bcryptjs');
var CryptoJs = require('crypto-js');

router.post('/login', function (req, res) {
  var userid = req.body.userid;
  var password = req.body.password;
  console.log("yha pahucha v ki nhi");
  // var password = CryptoJS.AES.decrypt(req.body.password, key).toString(CryptoJS.enc.Utf8);

  common.login(userid, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      console.log(rows);
      if (!rows.length) {
        res.json({
          success: 0,
          message: `Wrong credential.`
        })
      } else {

        let user = JSON.parse(JSON.stringify(rows[0]));

        bcrypt.compare(req.body.password, user.password, function (err, result) {
          console.log("compare hua v ki nhi");

          if (err) {
            console.log("compare nhi ho paya");

            return res.json({
              success: 0,
              message: `Wrong credential.`
            });
          } else if (result) {
            console.log("compare ho paya");

            let response = {
              userid: user.user_id,
              role: user.role,
              user_name: user.name

            }
            const token = jwt.sign(response, 'SECreTIsAlwaYSSecRET');
            res.json({ token: token, success: 1, role: user.role, message: 'Login Success' });
          } else {
            console.log("nhi hua yaar");
            res.json({
              success: 0,
              message: `Wrong credential.`
            })
          }
        });
      }
    }
  });
});

/* GET users listing. */
router.get('/dept', function(req, res, next) {
  return db.query('select * from mas_dept', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/vendor', function(req, res, next) {
  return db.query('select * from mas_vendor', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/os', function(req, res, next) {
  return db.query('select * from mas_os', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/machine', function(req, res, next) {
  return db.query('select * from mas_machine_type', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/win', function(req, res, next) {
  return db.query('select * from mas_win_version', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/cent', function(req, res, next) {
  return db.query('select * from mas_linux_version', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/model', function(req, res, next) {
  return db.query('select * from mas_model', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/ram', function(req, res, next) {
  return db.query('select * from mas_ram', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/core', function(req, res, next) {
  return db.query('select * from mas_core', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/diskspace', function(req, res, next) {
  return db.query('select * from mas_diskspace', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});




router.get('/emp', function(req, res, next) {
  return db.query('select * from mas_emp_type', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/design', function(req, res, next) {
  return db.query('select * from mas_designation', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/user_info', function(req, res, next) {
  return db.query('select * from mas_user', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/plateform_info', function(req, res, next) {
  return db.query('select * from mas_plateform', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/app_info', function(req, res, next) {
  return db.query('select * from mas_app', function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
});
});

router.get('/user', function(req, res, next) {
    return db.query('select mu.*,DATE_FORMAT(mu.joining_date,"%Y-%m-%d") as doj ,md.dept_name,met.emp_type,md.dept_code,mu.mobile_no,mu.email_id from mas_user mu join mas_dept md on mu.dept_code=md.dept_code join mas_emp_type met on mu.emp_type_id=met.emp_type_id ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/apps', function(req, res, next) {
    return db.query('select ma.*,DATE_FORMAT(ma.ssl_expiry,"%Y-%m-%d") as exp ,ms.server_ip,md.dept_name,mp.plateform_name from mas_app ma  join mas_dept md on md.dept_code=ma.dept_code join mas_server ms on ma.server_id=ms.server_id join mas_plateform mp on ma.plateform_id=mp.plateform_id', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/db', function(req, res, next) {
    return db.query('select mdb.*,ms.server_ip,ma.app_name,md.dept_name from mas_db mdb join mas_app ma on mdb.app_id=ma.app_id join mas_dept md on mdb.dept_code=md.dept_code join mas_server ms on mdb.server_id=ms.server_id', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/dbtype', function(req, res, next) {
    return db.query('select * from mas_db_type', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/map', function(req, res, next) {
    return db.query('select mau.app_id,ma.app_name, GROUP_CONCAT(Distinct mu.name order  by mu.name asc separator " , ") as Employees from map_app_user mau JOIN mas_app ma ON mau.app_id=ma.app_id JOIN mas_user mu ON mau.user_id = mu.user_id group by app_id', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/mapwo', function(req, res, next) {
    return db.query('select mew.wo_details_id,mwd.work_order_no, GROUP_CONCAT(Distinct mu.name order  by mu.name asc separator " , ") as Employees from map_emp_wo mew JOIN mas_wo_details mwd ON mew.wo_details_id=mwd.wo_details_id JOIN mas_user mu ON mew.user_id = mu.user_id group by mwd.work_order_no', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/server', function(req, res, next) {
    return db.query('select ms.*,md.dept_name from mas_server ms join mas_dept md on ms.dept_code=md.dept_code', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/workorder', function(req, res, next) {
    return db.query('select mw.*,mv.vendor_name,md.dept_name from mas_workorder mw join mas_dept md on mw.dept_code=md.dept_code join mas_vendor mv on mw.vendor_id=mv.vendor_id ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/wodetails', function(req, res, next) {
    return db.query('select * from mas_wo_details ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/task/:user_id', function(req, res, next) {
    console.log("hi",req.params);
    return db.query('select mau.app_id,ma.app_name from map_app_user mau join mas_app ma on ma.app_id=mau.app_id WHERE mau.user_id=?', [req.params.user_id] , function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/weekTask', function(req, res, next) {
    return db.query('select ma.app_id , ma.app_name from mas_app ma ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/appcount', function(req, res, next) {
    return db.query('select count(*) as x from mas_app ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/empcount', function(req, res, next) {
    return db.query('select count(*) as x from mas_user ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/servercount', function(req, res, next) {
    return db.query('select count(*) as x from mas_server ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/dbcount', function(req, res, next) {
    return db.query('select count(*) as x from mas_db ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/stockcount', function(req, res, next) {
    return db.query('select count(*) as x from stock_receive_mas ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/sslcount', function(req, res, next) {
    return db.query('select count(*) as x from mas_app ma WHERE ma.ssl_expiry<CURDATE() ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  

  router.get('/sslPriorCount', function(req, res, next) {
    return db.query('select count(*) as x from mas_app ma WHERE (ma.ssl_expiry - CURDATE())< 6 AND (ma.ssl_expiry - CURDATE())>0; ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/project', function(req, res, next) {
    return db.query('select mad.* , ma.app_name from mas_app_desc mad join mas_app ma on mad.app_id=ma.app_id ', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/weekly/:user_id', function(req, res, next) {
    return db.query('select mw.work_done,mw.app_id, ma.app_name, concat(DATE_FORMAT(mw.start,"%d/%m/%Y"), " - " ,DATE_FORMAT(mw.end,"%d/%m/%Y")) week from mas_weekly_task mw join mas_app ma on mw.app_id=ma.app_id WHERE mw.user_id=?', [req.params.user_id] ,function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/apps_report', function(req, res, next) {
    //console.log("hi",req.params);
    return db.query('select mau.*,ma.*,DATE_FORMAT(ma.ssl_expiry,"%Y-%m-%d") as exp, GROUP_CONCAT(Distinct mu.name order  by mu.name asc separator " , ") as employees,ms.server_ip,md.dept_name,mp.plateform_name from map_app_user mau JOIN mas_user mu ON mau.user_id=mu.user_id right JOIN mas_app ma ON mau.app_id = ma.app_id join mas_dept md on ma.dept_code=md.dept_code join mas_server ms on ma.server_id=ms.server_id join mas_plateform mp on ma.plateform_id=mp.plateform_id group by ma.app_id', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/ssl_exp', function(req, res, next) {
    //console.log("hi",req.params);
    return db.query('select mau.*,ma.*,DATE_FORMAT(ma.ssl_expiry,"%Y-%m-%d") as exp, GROUP_CONCAT(Distinct mu.name order  by mu.name asc separator " , ") as employees,ms.server_ip,md.dept_name,mp.plateform_name from map_app_user mau JOIN mas_user mu ON mau.user_id=mu.user_id right JOIN mas_app ma ON mau.app_id = ma.app_id join mas_dept md on ma.dept_code=md.dept_code join mas_server ms on ma.server_id=ms.server_id join mas_plateform mp on ma.plateform_id=mp.plateform_id WHERE ma.ssl_expiry<CURDATE() group by ma.app_id', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/ssl_prior', function(req, res, next) {
    //console.log("hi",req.params);
    return db.query('select mau.*,ma.*,DATE_FORMAT(ma.ssl_expiry,"%Y-%m-%d") as exp, GROUP_CONCAT(Distinct mu.name order  by mu.name asc separator " , ") as employees,ms.server_ip,md.dept_name,mp.plateform_name from map_app_user mau JOIN mas_user mu ON mau.user_id=mu.user_id right JOIN mas_app ma ON mau.app_id = ma.app_id join mas_dept md on ma.dept_code=md.dept_code join mas_server ms on ma.server_id=ms.server_id join mas_plateform mp on ma.plateform_id=mp.plateform_id  WHERE (ma.ssl_expiry - CURDATE())< 6 AND (ma.ssl_expiry - CURDATE())>=0 group by ma.app_id', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });


  router.get('/app_report/:dept_code', function(req, res, next) {
    console.log("hi",req.params);
    return db.query(`select mau.*,ma.*,DATE_FORMAT(ma.ssl_expiry,"%Y-%m-%d") as exp, GROUP_CONCAT(Distinct mu.name order  by mu.name asc separator " , ") as employees,ms.server_ip,md.dept_name,mp.plateform_name
    from map_app_user mau JOIN mas_user mu ON mau.user_id=mu.user_id right JOIN mas_app ma ON mau.app_id = ma.app_id join mas_dept md on ma.dept_code=md.dept_code join mas_server ms on 
    ma.server_id=ms.server_id join mas_plateform mp on ma.plateform_id=mp.plateform_id  WHERE ma.dept_code=? GROUP BY ma.app_id`, [req.params.dept_code] , function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/app_report2/:plateform_id', function(req, res, next) {
    console.log("hi",req.params);
    return db.query(`select mau.*,ma.*,DATE_FORMAT(ma.ssl_expiry,"%Y-%m-%d") as exp, GROUP_CONCAT(Distinct mu.name order  by mu.name asc separator " , ") as employees,ms.server_ip,md.dept_name,mp.plateform_name
    from map_app_user mau JOIN mas_user mu ON mau.user_id=mu.user_id right JOIN mas_app ma ON mau.app_id = ma.app_id join mas_dept md on ma.dept_code=md.dept_code join mas_server ms on 
    ma.server_id=ms.server_id join mas_plateform mp on ma.plateform_id=mp.plateform_id  WHERE ma.plateform_id=? GROUP BY ma.app_id`, [req.params.plateform_id] , function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/db_report/:dept_code', function(req, res, next) {
    console.log("hi",req.params);
    return db.query('select mdb.*,ms.server_ip,ma.app_name,md.dept_name from mas_db mdb join mas_app ma on mdb.app_id=ma.app_id join mas_dept md on mdb.dept_code=md.dept_code join mas_server ms on mdb.server_id=ms.server_id WHERE mdb.dept_code=?', [req.params.dept_code] , function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/db_report2/:server_id', function(req, res, next) {
    console.log("hi",req.params);
    return db.query('select mdb.*,ms.server_ip,ma.app_name,md.dept_name from mas_db mdb join mas_app ma on mdb.app_id=ma.app_id join mas_dept md on mdb.dept_code=md.dept_code join mas_server ms on mdb.server_id=ms.server_id WHERE mdb.server_id=?', [req.params.server_id] , function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/user_report', function(req, res, next) {
    //console.log("hi",req.params);
    return db.query('select mau.*,mu.*,DATE_FORMAT(mu.joining_date,"%Y-%m-%d") as doj, GROUP_CONCAT(Distinct ma.app_name order  by ma.app_name asc separator " , ") as projects,md.dept_name,met.emp_type from map_app_user mau JOIN mas_app ma ON mau.app_id=ma.app_id right JOIN mas_user mu ON mau.user_id = mu.user_id join mas_dept md on mu.dept_code=md.dept_code join mas_emp_type met on mu.emp_type_id=met.emp_type_id group by mu.user_id', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/emp_report/:dept_code', function(req, res, next) {
    console.log("hi",req.params);
    return db.query('select mau.*,mu.*,DATE_FORMAT(mu.joining_date,"%Y-%m-%d") as doj, GROUP_CONCAT(Distinct ma.app_name order  by ma.app_name asc separator " , ") as projects,md.dept_name,met.emp_type from map_app_user mau JOIN mas_app ma ON mau.app_id=ma.app_id right JOIN mas_user mu ON mau.user_id = mu.user_id join mas_dept md on mu.dept_code=md.dept_code join mas_emp_type met on mu.emp_type_id=met.emp_type_id WHERE mu.dept_code=? group by mu.user_id ', [req.params.dept_code] , function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/server_report/:dept_code', function(req, res, next) {
    console.log("hi",req.params);
    return db.query('SELECT ms.server_id,ms.server_ip,ms.server_type,md.dept_name,GROUP_CONCAT(Distinct ma.app_name order  by ma.app_name asc separator " , ") as Applications ,GROUP_CONCAT(Distinct mdb.db_name order  by mdb.db_name asc separator " , ") as DBs FROM mas_server ms JOIN mas_dept md ON ms.dept_code=md.dept_code left JOIN mas_app ma  ON ms.server_id=ma.server_id LEFT JOIN mas_db mdb ON ms.server_id=mdb.server_id WHERE md.dept_code=? GROUP BY ms.server_id ', [req.params.dept_code] , function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });

  router.get('/server_report1', function(req, res, next) {
    //console.log("hi",req.params);
    return db.query('SELECT ms.server_id,ms.server_ip,ms.server_type,md.dept_name,GROUP_CONCAT(Distinct ma.app_name order  by ma.app_name asc separator " , ") as Applications ,GROUP_CONCAT(Distinct mdb.db_name order  by mdb.db_name asc separator " , ") as DBs FROM mas_server ms JOIN mas_dept md ON ms.dept_code=md.dept_code left JOIN mas_app ma  ON ms.server_id=ma.server_id LEFT JOIN mas_db mdb ON ms.server_id=mdb.server_id GROUP BY ms.server_id;', function (err, rows1) {
      if (err) {
        console.error('error connecting: ' + err);
        return res.json(err);
      }
      //req.session.destroy(); 
      return res.json(rows1);
  });
  });


  router.post('/dept', function (req, res) {
  
  return db.query('insert into mas_dept (dept_name,remarks) values (?,?)',[req.body.dept_name,req.body.remarks], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});

router.post('/map', function (req, res) {
  
  return db.query('insert into map_app_user (app_id,user_id) values (?,?)',[req.body.app_id,req.body.user_id], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});


router.post('/mapwo', function (req, res) {
  
  return db.query('insert into map_emp_wo (wo_details_id,user_id) values (?,?)',[req.body.wo_details_id,req.body.user_id], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});

router.post('/apps', function (req, res) {
  
  return db.query('insert into mas_app (app_name,plateform_id,platform_version,server_id,dept_code,public_ip,url,ssl_expiry) values (?,?,?,?,?,?,?,?)',[req.body.app_name,req.body.plateform_id,req.body.platform_version,req.body.server_id,req.body.dept_code,req.body.public_ip,req.body.url,req.body.ssl_expiry], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});

router.post('/workorder', function (req, res) {
  
  return db.query('insert into mas_workorder (dept_code,project_no,project_name,vendor_id,work_order_no,work_order_location,pi,pi_location,pef,pef_location) values (?,?,?,?,?,?,?,?,?,?)',[req.body.dept_code,req.body.project_no,req.body.project_name,req.body.vendor_id,req.body.work_order_no,req.body.work_order_location,req.body.pi,req.body.pi_location,req.body.pef,req.body.pef_location], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
    
});

router.post('/wodetails', function (req, res) {
  
   return db.query('insert into mas_wo_details (work_order_no,design_id,work_order_from,work_order_to) values (?,?,?,?)',[req.body.work_order_no,req.body.design_id,req.body.work_order_from,req.body.work_order_to], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);

});
   
});

router.post('/db', function (req, res) {
  
  return db.query('insert into mas_db (db_name,db_type,current_size,server_id,dept_code,app_id) values (?,?,?,?,?,?)',[req.body.db_name,req.body.db_type,req.body.current_size,req.body.server_id,req.body.dept_code,req.body.app_id], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});

router.post('/server', function (req, res) {
  
  return db.query('insert into mas_server (server_ip,server_type,dept_code,os,version,machine_type,ram,disk_space,physical_core,model,va,va_score) values (?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.server_ip,req.body.server_type,req.body.dept_code,req.body.os,req.body.version,req.body.machine_type,req.body.ram,req.body.disk_space,req.body.physical_core,req.body.model,req.body.va,req.body.va_score], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});

router.post('/task', function (req, res) {
  
  return db.query('insert into mas_weekly_task (user_id,start,end,app_id,work_done) values (?,?,?,?,?)',[req.body.user_id,req.body.start,req.body.end,req.body.app_id,req.body.work_done], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});

router.post('/project', function (req, res) {
  
  return db.query('insert into mas_app_desc (app_id,start_date,app_details) values (?,?,?)',[req.body.app_id,req.body.start_date,req.body.app_details], function (err, rows1) {
    if (err) {
      console.error('error connecting: ' + err);
      return res.json(err);
    }
    //req.session.destroy(); 
    return res.json(rows1);
  });
});


router.put('/user', function (req, res) {
  return db.query('update mas_user mu set mu.name = ? ,mu.dept_code = ?, mu.mobile_no = ? , mu.address = ?, mu.machine_ip = ?, mu.emp_type_id = ? , mu.joining_date = ?, mu.email_id = ?, mu.ol_location = ? where mu.user_id=?', [req.body.name,req.body.dept_code,req.body.mobile_no,req.body.address,req.body.machine_ip,req.body.emp_type_id,req.body.joining_date,req.body.email_id,req.body.ol_location,req.body.user_id], function (err, rows1) {
      //req.session.destroy(); 
      return res.json(rows1);
  });
});

router.put('/server', function (req, res) {
  console.log(this.data);
  return db.query('update mas_server ms set ms.server_ip = ? , ms.server_type =?, ms.dept_code = ?, ms.os = ? , ms.machine_type = ?, ms.ram=?, ms.physical_core=?,ms.model=?,ms.disk_space=?,ms.version=?,ms.va=?,ms.va_score=? where ms.server_id=?', [req.body.server_ip,req.body.server_type,req.body.dept_code,req.body.os,req.body.machine_type,req.body.ram,req.body.physical_core,req.body.model,req.body.disk_space,req.body.version,req.body.va,req.body.va_score,req.body.server_id], function (err, rows1) {
      //req.session.destroy(); 
      return res.json(rows1);
  });
});

router.put('/dept', function (req, res) {
  return db.query('update mas_dept md set md.dept_name = ? ,md.remarks = ? where md.dept_code=?', [req.body.dept_name,req.body.remarks,req.body.dept_code], function (err, rows1) {
      //req.session.destroy(); 
      return res.json(rows1);
  });
});

router.put('/db', function (req, res) {
  return db.query('update mas_db mdb set mdb.db_name = ?, mdb.db_type = ?, mdb.current_size = ?,  mdb.server_id = ?, mdb.dept_code = ?, mdb.app_id = ? where mdb.db_id=?', [req.body.db_name,req.body.db_type,req.body.current_size,req.body.server_id,req.body.dept_code,req.body.app_id,req.body.db_id], function (err, rows1) {
      //req.session.destroy(); 
      return res.json(rows1);
  });
});

router.put('/apps', function (req, res) {
  return db.query('update mas_app ma set ma.app_name = ?, ma.plateform_id = ?, ma.platform_version = ?, ma.server_id = ?, ma.dept_code = ?, ma.public_ip = ?, ma.url = ?, ma.ssl_expiry = ?, ma.is_notified=0 where ma.app_id = ?', [req.body.app_name,req.body.plateform_id,req.body.platform_version,req.body.server_id,req.body.dept_code,req.body.public_ip,req.body.url,req.body.ssl_expiry,req.body.app_id], function (err, rows1) {
      //req.session.destroy(); 
      return res.json(rows1);
  });
});

router.put('/project', function (req, res) {
  return db.query('update mas_app_desc md set md.app_details= ? ,md.start_date = ? where md.app_id=?', [req.body.app_details,req.body.start_date,req.body.app_id], function (err, rows1) {
      //req.session.destroy(); 
      return res.json(rows1);
  });
});

// router.put('/password', function (req, res) {
//   return db.query('update mas_user mu set mu.password= ? where mu.user_id=? and mu.password=?', [req.body.password,req.body.user_id,req.body.password], function (err, rows1) {
//       //req.session.destroy(); 
//       return res.json(rows1);
//   });
// });

router.put('/password', function (req, res) {
  var userid = req.body.user_id;
  var old_password = req.body.Password;
  var password = req.body.New_Password
  console.log("yha v dekhle",req.body);

  // var password = CryptoJS.AES.decrypt(req.body.password, key).toString(CryptoJS.enc.Utf8);

  common.changePass(userid, async function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      console.log(rows);
      if (!rows.length) {
        res.json({
          success: false,
          message: `Wrong credential.`
        })
      } else {

        let user = JSON.parse(JSON.stringify(rows[0]));
        //console.log("check 1",user);

        bcrypt.compare(req.body.Password, user.password, function (err, result) {
          console.log("Yaha tak aaya ya nhi");

          if (err) {
             console.log("Galat hai current password");
            return res.json({
              success: 0,
              message: `Wrong Current Password.`
            });
          } else if (result) {
            console.log("yaha v aa gya");
            const hashPass = CryptoJs.AES.decrypt(req.body.New_Password, 'rms_project').toString(CryptoJs.enc.Utf8);
            console.log('hashPass***', hashPass);
            bcrypt.hash(hashPass,10, async (err,hash)=>{
              err ? console.log("err***",err) : console.log("hash*******",hash);
              return db.query('update mas_user mu set mu.password= ? where mu.user_id=?', [hash,req.body.user_id], function (err, rows1) {
                //req.session.destroy(); 
                return res.json({'success': true});
            });
            });
          } else {
            console.log("nhi jama");
            res.json({
              success: 0,
              message: `Wrong credential.`
            })
          }
        });
      }
    }
    
  });
});
module.exports = router;