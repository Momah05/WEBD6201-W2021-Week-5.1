/* custom JavaScript goes here */

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
//Closure - limits scope leak

"use strict";

((core) => {
  function displayHome() {
    let paragraphOneText =
      "This is a simple site to demonstrate DOM Manipulation for ICE 1";

    let paragraphOneElement = document.getElementById("paragraphOne");

    paragraphOneElement.textContent = paragraphOneText;
    paragraphOneElement.className = "fs-5";

    // Step 1. document.createElement
    let newParagraph = document.createElement("p");
    // Step 2. configure the element
    newParagraph.setAttribute("id", "paragraphTwo");
    newParagraph.textContent = "...And this is paragraph two";
    // Step 3. select the parent element
    let mainContent = document.getElementsByTagName("main")[0];
    // Step 4. Add / Insert the element
    mainContent.appendChild(newParagraph);

    newParagraph.className = "fs-6";

    // another way of injecting content
    let paragraphDiv = document.createElement("div");
    let paragraphThree = `<p id="paragraphThree" class="fs-7 fw-bold">And this is the Third Paragraph</p>`;
    paragraphDiv.innerHTML = paragraphThree;

    // insertions

    // example of inserting before a node
    //newParagraph.before(paragraphDiv);

    // example of inserting after a node
    newParagraph.after(paragraphDiv);

    // deletions

    // example of removing a single element
    //paragraphOneElement.remove();

    // example of removeChild
    mainContent.removeChild(paragraphOneElement);

    // update / modification
    //mainContent.firstElementChild.textContent = "Welcome Home!";

    mainContent.innerHTML = `<h1 id="firstHeading">Welcome to WEBD6201 - Lab 1</h1>
         <p id="paragraphOne" class="fs-3 fw-bold">This is my first Paragraph</p>
        `;

  }

  function displayAbout() {

  }

  function displayProjects() {

  }

  function displayServices() {

  }

  function displayContact() {
    let messageArea = $("#messageArea").hide();

    // form validation
    $("#fullName").on("blur", function () {
      if ($(this).val().length < 2) {
        $(this).trigger("focus").trigger("select");
        messageArea.show().addClass("alert alert-danger").text("Please enter an appropriate Name");
      } else {
        messageArea.removeAttr("class").hide();
      }
    });

    $("#sendButton").on("click", (event) => {
      if ($("#subscribeCheckbox")[0].checked) {
        let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

        if (contact.serialize()) {
          let key = contact.FullName.substring(0, 1) + Date.now();

          localStorage.setItem(key, contact.serialize());
        }
      }
    });
  }

  function displayContactList() {
    if (localStorage.length > 0) {
      let contactList = document.getElementById("contactList");

      let data = "";

      let keys = Object.keys(localStorage);

      // Used to loop through each key and output what the key is.
      // keys.forEach(key => {
      //     console.log(key);
      // });

      // This will output the keys and show you its properties.
      // for (const key in localStorage) {
      //   console.log(key);
      // }



      // An easier way  loop through each key and output what the key is
      // Now you can delete an item from the contact list with out breaking the code.

      let index = 1;

      for (const key of keys) {
        let contactData = localStorage.getItem(key);

        let contact = new core.Contact();
        contact.deserialize(contactData);

        data += `<tr>
          <th scope="row">${index}</th>
          <td>${contact.FullName}</td>
          <td>${contact.ContactNumber}</td>
          <td>${contact.EmailAddress}</td>
          <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
          <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
        </tr>`;

        index++;
      }

      contactList.innerHTML = data;

      //TODO - need to create an edit page
      // Done
      $("button.edit").on("click", function () {
        location.href = "edit.html#" + $(this).val();
      });

      //TODO - need to fix this item - it breaks when we delete a middle item
      //DONE
      $("button.delete").on("click", function () {
        if (confirm("Are you sure?")) {
          localStorage.removeItem($(this).val());
        }
        location.href = "contact-list.html"; // refresh the page
      });

      $("#addButton").on("click", function()
      {
        location.href = "edit.html";
      });
    }
  }

  function displayEdit() 
  {
    // Get they key from the hash
    let key = location.hash.substring(1);

    // Make a new contact as a container for what i am editing.
    let contact = new core.Contact();

    // Checking to ensure they key is not empty
    if(key != "")
    {
      // Deserialize if key is not empty and get contact info
      contact.deserialize(localStorage.getItem(key));

      // Display contact info in the form
      $("#fullName").val(contact.FullName);
      $("#contactNumber").val(contact.ContactNumber);
      $("#emailAddress").val(contact.EmailAddress);
    }
    else
    {
      // Modify the page so it shows ADD CONTACT & ADD BUTTON
      $("main>h1").text("Add Contact");
      $("#editButton").html(`<i class="fas fa-edit fa-lg"></i> Add`);
    }

    $("#editButton").on("click", function(){
      // Check to see if key is empty
      if(key == "")
      {
        // if empty create a new key
        key = contact.FullName.substring(0, 1) + Date.now();

      }

      // Copy contact info from form into contact object
      contact.FullName = $("#fullName").val();
      contact.ContactNumber = $("#contactNumber").val();
      contact.EmailAddress = $("#emailAddress").val();

      // Add the contact info to local storage
      localStorage.setItem(key, contact.serialize());
      
      // Return to the contact list
      location.href = "contact-list.html";

    });

    $("#cancelButton").on("click", function(){
      location.href = "contact-list.html";
    });
  }




  function Start() {
    console.log("App Started...");

    switch (document.title) {
      case "Home":
        displayHome();
        break;
      case "About":
        displayAbout();
        break;
      case "Projects":
        displayProjects();
        break;
      case "Services":
        displayServices();
        break;
      case "Contact":
        displayContact();
        break;
      case "Contact-List":
        displayContactList();
        break;
      case "Edit":
        displayEdit();
        break;
    }

  }

  window.addEventListener("load", Start);

  core.Start = Start;

})(core || (core = {}));