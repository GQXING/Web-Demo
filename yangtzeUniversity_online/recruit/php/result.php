<?php 
require_once('config.php'); 

 error_reporting(E_ALL || ~E_NOTICE);//忽略警告

$sqlCount="select count(*) from info";//查询总数
$rstCount=mysql_query($sqlCount);//执行sql语句得到结果集
$rowCount=mysql_fetch_row($rstCount);
$total=$rowCount[0];//总数

$length=2;//每页个数

$pagenum=ceil($total/$length);//总页数
$page=$_GET['p']?$_GET['p']:1;//计算当前页数

$offset=($page-1)*$length;//计算offset
$prevpage=$page-1;//计算上一页和下一页
	if($page>=$pagenum){
	   $nextpage=$pagenum;
	}else{
		$nextpage=$page+1;
	}

$sql="select * from info order by id limit $offset,$length";//输出每页的数据
$result=mysql_query($sql);




// echo $total;
// exit;


 ?>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>查看结果</title>
</head>
<body>
<table align="center" border="1"  width="70%">
	<tr>
		<th>编号</th>
		<th>姓名</th>
		<th>性别</th>
		<th>学号</th>
		<th>院系</th>
		<th>电话</th>
		<th>QQ</th>
	</tr>
<?php 
while ($row=mysql_fetch_array($result)) {
	?>

	<tr>
		<th><?php echo $row[id]?></th>
		<th><?php echo $row[name]?></th>
		<th><?php echo $row[sex]?></th>
		<th><?php echo $row[number]?></th>
		<th><?php echo $row[department]?></th>
		<th><?php echo $row[phone]?></th>
		<th><?php echo $row[qq]?></th>


<?php
}

 ?>

</table>

<div  align="center">
	
<?php
echo "<p><b><a href='result.php'>首页</a>|<a href='result.php?p={$prevpage}'>
 上一页</a>|<a href='result.php?p={$nextpage}'>下一页</a>|<a href='result.php?p=$pagenum'>
 末页</a></b></p>";	
?>
<p>注：这里只显示主要信息，如果需要查看详细信息可在报名结束之后将数据库内容全部导出成Excel表格</p>
</div>
</body>
</html>





