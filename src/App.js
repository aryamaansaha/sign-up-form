import React, { Component } from "react";
import "./App.css";

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const formValid = ({ formErrors, ...rest }) => {
	let valid = true;

	Object.values(formErrors).forEach((val) => {
		val.includes(" ") && (valid = false);
	});

	Object.values(rest).forEach((val) => {
		val === null && (valid = false);
	});

	return valid;
};

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			email: null,
			password: null,
			confirmPassword: null,
			passhint: "Adam123",
			formErrors: {
				name: "",
				email: "",
				password: "",
				confirmPassword: "",
				passmatch: "",
			},
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		if (formValid(this.state)) {
			alert(`
        Submit was successful!!
        Name: ${this.state.name}
        Email: ${this.state.email}
      `);
		} else {
			alert("INVALID-- Please fill in details correctly");
		}
	};

	handleChange = (e) => {
		// e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		const passhint = this.state.passhint;

		switch (name) {
			case "name":
				let subnames = value.split(" ");

				subnames.forEach((subname) => {
					if (subname.length >= 0 && subname.length < 3) {
						formErrors.name = "Minimum 3 characters for each name";
					} else if (!subname.match(/^[a-zA-Z]+$/)) {
						formErrors.name = "Enter valid name";
					} else if (!(subname[0] === subname[0].toUpperCase())) {
						formErrors.name = "First letter of each name must be capitalized";
					} else if (subnames.length < 2) {
						formErrors.name = "Enter full name";
					} else {
						formErrors.name = "";
					}
				});
				break;

			case "email":
				let indexafter = value.indexOf("@") + 1;
				console.log(/\d/.test(value[0]), /\d/.test(value[indexafter]));
				formErrors.email =
					emailRegex.test(value) &&
					!/\d/.test(value[0]) &&
					!/\d/.test(value[indexafter])
						? ""
						: "invalid email address";
				break;
			case "password":
				if (value.length < 6) {
					formErrors.password = "Minimum 6 characters";
				} else if (value.includes(" ")) {
					formErrors.password = "Spaces are not allowed";
				} else if (value === passhint) {
					formErrors.password = "Password can't be same as the hint";
				} else {
					formErrors.password = "";
				}
				formErrors.passmatch = value;

				break;
			case "confirmPassword":
				console.log(formErrors.passmatch);
				formErrors.confirmPassword =
					value === formErrors.passmatch ? "" : "Passwords don't match";
				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	};

	render() {
		const { formErrors } = this.state;
		const { passhint } = this.state;

		return (
			<div className="wrapper">
				<div className="form-wrapper">
					<h1>Sign Up Form</h1>
					<form onSubmit={this.handleSubmit}>
						<div className="name">
							<label htmlFor="name">Name</label>
							<input
								className={formErrors.name.length > 0 ? "error" : null}
								placeholder="Name"
								type="text"
								name="name"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.name.length > 0 && (
								<small className="errormsg">{formErrors.name}</small>
							)}
						</div>
						<div className="email">
							<label htmlFor="email">Email</label>
							<input
								className={formErrors.email.length > 0 ? "error" : null}
								placeholder="Email"
								type="email"
								name="email"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.email.length > 0 && (
								<small className="errormsg">{formErrors.email}</small>
							)}
						</div>
						<div className="password">
							<label htmlFor="password">Password</label>
							<input
								className={formErrors.password.length > 0 ? "error" : null}
								placeholder="Password"
								type="password"
								name="password"
								noValidate
								onChange={this.handleChange}
							/>
							<small>For Example: {passhint}</small>
							{formErrors.password.length > 0 && (
								<small className="errormsg">{formErrors.password}</small>
							)}
						</div>
						<div className="confirmPassword">
							<label htmlFor="password">Confirm Password</label>
							<input
								className={
									formErrors.confirmPassword.length > 0 ? "error" : null
								}
								placeholder="Re-enter Password"
								type="password"
								name="confirmPassword"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.confirmPassword.length > 0 && (
								<small className="errormsg">{formErrors.confirmPassword}</small>
							)}
						</div>
						<div className="checkbox">
							<input
								type="checkbox"
								id="checkbox"
								noValidate
								className=""
								name="Checkbox"
								onChange={this.handleChange}
								required
							></input>
							<label htmlFor="checkbox">
								I accept the terms and conditions
							</label>
						</div>
						<div className="signupbutton">
							<button type="submit">Sign Up</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default App;
