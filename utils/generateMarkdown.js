const fs = require('fs');

// Returns a license badge; if there is no license, return an empty string
function addLicenseBadge(license) {
    if (!license) {
        return '';
    } else {
        const encodedLicense = encodeURIComponent(license); // Use encodeURIComponent to handle spaces
        return `[![${license} license](https://img.shields.io/badge/License-${encodedLicense}-blue.svg)](${addLicenseLink(license)})`;
    }
}

// Returns the license link
function addLicenseLink(license) {
    if (license === 'MIT License') {
        return 'https://choosealicense.com/licenses/mit/';
    }
    if (license === 'Apache License 2.0') {
        return 'https://www.apache.org/licenses/LICENSE-2.0';
    }
    if (license === 'Creative Commons Zero v1.0') {
        return 'https://creativecommons.org/publicdomain/zero/1.0/deed.en';
    }
    if (license === 'GNU General Public License v3.0') {
        return 'https://www.gnu.org/licenses/gpl-3.0.en.html';
    }
    if (license === 'Mozilla Public License v2.0') {
        return 'https://www.mozilla.org/en-US/MPL/2.0/';
    }
}

// Returns the license section of README; if there is no license, return an empty string
function addLicenseSection(license) {
    if (!license) {
        return '';
    } else {
        return `## Licenses
This project is covered under the ${license} license. Click the license badge at the top of this README for more information.`;
    }
}

// Generate markdown for README
function generateMarkdown(data) {
    return `# ${data.title}

${addLicenseBadge(data.licenses)}
	
## Description
${data.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Licenses](#licenses)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

${addLicenseSection(data.licenses)}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
Have questions about this project? Get in touch! Contact ${data.fullName} at ${data.email}. View more projects by ${data.fullName} on Github: [github.com/${data.github}](https://github.com/${data.github}).`; 
}

module.exports = generateMarkdown;
