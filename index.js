// Packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// Validation function to ensure that both a first and last name are included
const validateFullName = fullNameInput => {
	if (fullNameInput.split(' ').length >= 2) {
		return true;
	} else {
		console.log(' – Provide both a first and last name (minimum two words).');
		return false;
	}
};

// Validation function to ensure that the GitHub username has no spaces
const validateGitHubUsername = githubInput => {
	if (githubInput.indexOf(' ') === -1) {
		return true;
	} else {
		console.log(' – GitHub username should not contain spaces.');
		return false;
	}
};

// Validation function to ensure that the input is a valid email address
const validateEmail = emailInput => {
	// Regular expression to validate email format
	const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (emailFormat.test(emailInput)) {
		return true;
	} else {
		console.log(' – Provide a valid email address.');
		return false;
	}
};

// Array of questions for user input
const questions = [
	{
		type: 'input',
		name: 'start',
		message: 'README GENERATOR\nPlease provide the following information.\nPRESS ENTER TO START...'
	},
	{
		type: 'input',
		name: 'fullName',
		message: 'Your full name (First + Last):',
		validate: validateFullName
	},
	{
		type: 'input',
		name: 'github',
		message: 'GitHub username:',
		validate: validateGitHubUsername
	},
	{
		type: 'input',
		name: 'email',
		message: 'Email:',
		validate: validateEmail
	},
	{
		type: 'input',
		name: 'title',
		message: 'Project title:',
		validate: titleInput => {
			if (titleInput) {
				return true;
			} else {
				console.log('Please provide your project title:');
				return false;
			}
		}
	},
	{
		type: 'input',
		name: 'description',
		message: "Project description:",
		validate: descriptionInput => {
			if (descriptionInput) {
				return true;
			} else {
				console.log('Provide a brief synopsis for your project:');
				return false;
			}
		}
	},
	{
		type: 'input',
		name: 'installation',
		message: 'Instructions for installation:',
		validate: installationInput => {
			if (installationInput) {
				return true;
			} else {
				console.log('Provide instructions for installation so others can use your project:');
				return false;
			}
		}
	},
	{
		type: 'input',
		name: 'usage',
		message: 'Instructions for usage:',
		validate: usageInput => {
			if (usageInput) {
				return true;
			} else {
				console.log('Provide instructions for how your app should be used:');
				return false;
			}
		}
	},
	{
		type: 'input',
		name: 'contributing',
		message: 'Project contributors:',
		validate: contributionInput => {
			if (contributionInput) {
				return true;
			} else {
				console.log('Provide credits for who has contributed / instructions for how others can contribute to your project:');
				return false;
			}
		}
	},
	{
		type: 'input',
		name: 'tests',
		message: 'Tests carried out:',
		validate: testsInput => {
			if (testsInput) {
				return true;
			} else {
				console.log('List which tests have been carried out for your project:');
				return false;
			}
		}
	},
	{
		type: 'confirm',
		name: 'confirmLicenses',
		message: 'Include a license?',
		default: false
	},
	{
		type: 'list',
		name: 'licenses',
		message: 'Select license:',
		choices: [
			'MIT License',
			'Apache License 2.0',
			'Creative Commons Zero v1.0',
			'GNU General Public License v3.0',
			'Mozilla Public License v2.0'
		],
		when: ({ confirmLicenses }) => {
			if (confirmLicenses) {
				return true;
			} else {
				return false;
			}
		}
	},
];

// Function to write README file to the output folder
const writeToFile = data => {
	return new Promise((resolve, reject) => {
		fs.writeFile('./output/README.md', data, err => {
			if (err) {
				reject(err); return;
			}
			resolve({
				ok: true,
				message: console.log('Your README has been generated in the OUTPUT folder.')
			});
		})
	})
}

// Initialize app
const init = () => {
	return inquirer.prompt(questions);
}

// Function call to initialize app
init()
	.then(userInput => {
		return generateMarkdown(userInput);
	})
	.then(readmeInfo => {
		return writeToFile(readmeInfo);
	})
	.catch(err => {
		console.log(err);
	})