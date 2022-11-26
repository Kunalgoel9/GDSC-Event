const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.urlencoded());

app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 2000;

app.get("/", function (request, response, next) {
  response.send(`
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<div class="container">
			<h1 class="text-center mt-3 mb-3">GDSC EVENT</h1>
			<div class="card">
				<div class="card-header">Student Data</div>
				<div class="card-body">
					<form method="POST" action="/">
						<div class="mb-3">
							<label>Name</label>
							<input type="text" name="name" id="name" class="form-control" />
						</div>
						<div class="mb-3">
		                	<label>College</label>
		                	<input type="text" name="college" id="college" class="form-control" />
		                </div>
		                <div class="mb-3">
		                	<input type="submit" name="submit_button" class="btn btn-primary" value="Add" />
		                </div>
					</form>
				</div>
			</div>
		</div>
	`);
});

app.post("/", async function (request, response, next) {
  try {
    const { name, college } = request.body;

    const data = JSON.stringify({ name, college });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "https://sheet.best/api/sheets/04e28da1-9081-45b1-b6b1-ba84c5bb5bf9",
        data,
        config
      )
      .then((res) => {
        if (res.status == 200) {
          response.send("Student Added");
        }
      });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, (req, res) => console.log("Server is Running"));
