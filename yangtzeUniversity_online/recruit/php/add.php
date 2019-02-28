    <?php  
      //把传递过来的信息入库；  
       session_start();  
       //用于核对验证码  
        require_once('config.php');  
      //  print_r($_POST);  
      error_reporting(E_ALL || ~E_NOTICE);//忽略警告
        //获取信息
       $name=$_POST["name"]; 
        $number=$_POST["number"]; 
        $sex=$_POST["sex"]; 
        $birthday=$_POST["birthday"];
        $birthplace=$_POST["birthplace"];
        $department=$_POST["college"];
        $phone=$_POST["phone"];
        $qq=$_POST["qq"];
        $email=$_POST['email'];  
        $address=$_POST["dormitory"];
        $target=$_POST["intention"];
        $introduce=$_POST["intro"];
        $specialty=$_POST["works"];
        $verification=$_POST["captcha"];

        date_default_timezone_set ("Asia/Shanghai");//设置时区
        $time=date('Y-m-d H:i:s');//获取时间作为注册时间  

// echo $name;
// echo $number;
// echo $sex;
// echo $birthday;
// echo $birthplace;
// echo $department;
// echo $phone;
// echo $qq;
// echo $email;
// echo $address;
// echo  $target;
// echo $introduce;
// echo $specialty;

          $sql="select * from info where number = '$number'";
          $query=mysql_query($sql);  
          $rows=mysql_num_rows($query);  


          $insertsql= "insert into info(name,number,sex,department,birthplace,birthday,phone,qq,email,address,introduce,target,specialty,time)values('$name','$number','$sex','$department','$birthplace','$birthday','$phone','$qq','$email','$address','$introduce','$target','$specialty','$time')";  
          if( $rows > 0){  
                    echo "<script>alert('此学号已经报名，请核对后填写');window.location.href='../recruit.html'</script>";  
                //学号不能重复  
                }elseif (($_SESSION['rand'])!=($verification )) {
                 echo "<script>alert('验证码错误！重新填写');window.location.href='../recruit.html'</script>";  
                  //判断验证码是否填写正确  
                }elseif(!(mysql_query($insertsql))){   //插入数据库 
                          echo mysql_error();  
                        }else{  
                          echo "<script>alert('报名成功！');window.location.href='../recruit.html'</script>";  
                                 }  

// exit;

    ?>  