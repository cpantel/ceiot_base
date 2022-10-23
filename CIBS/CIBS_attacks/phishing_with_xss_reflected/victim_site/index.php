<html>
<head>
<title>Reflected XSS victim</title>
</head>
<body>
<?php
  echo $_REQUEST['payload']
?>
</body>
</html>
