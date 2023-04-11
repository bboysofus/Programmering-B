<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

  <style>
    h1{
      color: red;
    }

    body{
      width: 100vw;
      height: 100vh;
      display: grid;
      place-items: center;
    }
  </style>
</head>
<body>
  <div>

  <button onclick="history.back()">⬅Tilbage</button>
  <br>
  <br>
      <?php
      $servername = "localhost";
      $username = "sofus";
      $password = "s-61v]8P9zxDZ]Gp";
      $dbname = "rapport";

      // Create connection
      $conn = mysqli_connect($servername, $username, $password, $dbname);

      // Check connection
      if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
      }
      echo "Connected successfully <br>";

      //Get data
      $sql = "SELECT `Link`, `Emne`, `Description`, `ID` FROM `rapporter` WHERE Emne='" . $_POST['name'] . "'";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          echo "Projekt " . $row["ID"]. ") <br> Emne: " . $row["Emne"] . "<br>" . $row["Description"]. "<br> <a href='" . $row["Link"] . "' target='_blank'>Se rapport her</a>";
        }
      } else {
        echo "0 results";
      }

      $conn->close();





















      // Create database
      // if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['create'])){
      //     createDB();
      // }
      // function createDB(){
      //     global $conn;

      //     $sql = "CREATE DATABASE " . $_POST["name"];
      //     if ($conn->query($sql) === TRUE) {
      //       echo " Database -" . $_POST["name"] . "- created successfully";
      //     } else {
      //       echo "Error creating database: " . $conn->error;
      //     }
      // }
      ?>
  </div>
</body>

<script>
</script>
</html>

