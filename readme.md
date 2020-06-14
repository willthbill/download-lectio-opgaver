## About
This repo contains scripts to download all task uploads from lectio and organize the files in a 'nice' folder structure.

## Instructions
1. Make sure you have a stable and fast internet connection (> 10 mbit/s should be fine).
2. Install Google Chrome
3. Install node
4. Clone this repo.
5. Folder1: Create a folder, where you want all the downloaded files to be located.
6. Edit your Chrome settings, such that the default download folder for chrome is Folder1. Also make sure to uncheck: "Ask where to save each file before downloading".
7. Edit your Chrome permissions for lectio.dk to: Automatic downloads = Allow.
8. Add the Codify chrome extensions to Chrome: https://chrome.google.com/webstore/detail/codify-the-code-adder/fdhkolbghmfidicmkaidnhpjcoeafojl?hl=en-GB
9. Go to lectio.dk.
10. Click the codify icon in the extension bar (top right) in chrome.
11. Copy the content of "codify_script.js" to the 'your code' input field in the codify popup window, make sure only "IF PAGE-URL CONTAINS MATCH" is checked and then click "assign code to page".
12. Go to the tasks ("opgaver") section of lectio and reload the page.
13. Make sure "Vis kun aktuelle" and "Vis kun for indeværende skoleår" is enabled.
14. Open chrome developer tools (F12 or CTRL-SHIFT-i).
15. Go to the console section.
16. Type: "downloadTasks()" and press enter.
17. Wait for all downloads to be done (if you wish to pause the downloading process you can close lectio and open it again when you wish at the exact same url as it was at when you closed it).
    
    TO STOP THE PROCESS: click the codify icon and go the the 'manage your code' section. Click the red cross next to the script you added.

18. Open a terminal.
19. Navigate into to the folder of this repo.
20. Run the following command: npm install
21. Run the following command: node arrange.js Folder1 Folder2. Where Folder2 is the folder which you want the 'nice' file-structure in (the output folder essentially).
22. If no errors occurred during these steps, you should now, in Folder2 have all your uploads to all tasks from lectio along with a metadata file associated with the given task (grade, elevtimer ...).