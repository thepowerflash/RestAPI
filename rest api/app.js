document.addEventListener("DOMContentLoaded", function() {
    const userListElement = document.getElementById("userList");
    const refreshButton = document.getElementById("refreshButton");
    const sortSelect = document.getElementById("sortSelect");
    const filterInput = document.getElementById("filterInput");
    
    refreshButton.addEventListener("click", fetchUsers);
    sortSelect.addEventListener("change", sortUsers);
    filterInput.addEventListener("input", filterUsers);
    
    let usersData = [];
    
    function fetchUsers() {
      axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
          usersData = response.data;
          displayUsers(usersData);
        })
        .catch(error => {
          console.error("Error fetching users:", error.message);
          userListElement.innerHTML = "<p>Ошибка загрузки пользователей. Пожалуйста, повторите попытку позже.</p>";
        });
    }
    
    function displayUsers(users) {
      userListElement.innerHTML = "";
      users.forEach(user => {
        const userCard = `
          <div class="userCard">
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
          </div>
        `;
        userListElement.innerHTML += userCard;
      });
    }
    
    function sortUsers() {
      const sortBy = sortSelect.value;
      let sortedUsers = [...usersData];
      
      sortedUsers.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
      
      displayUsers(sortedUsers);
    }
    
    function filterUsers() {
        const filterBy = filterInput.value.toLowerCase();
        const filteredUsers = usersData.filter(user => {
          return user.name.toLowerCase().includes(filterBy) || 
                 user.email.toLowerCase().includes(filterBy) ||
                 user.phone.replace(/\D/g, '').includes(filterBy);
        });
        
        displayUsers(filteredUsers);
      }
    
    fetchUsers();
  });