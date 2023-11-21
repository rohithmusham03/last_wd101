let userForm = document.getElementById("user_form");
let userEntries = [];
if (localStorage.getItem("userEntries") === null) {
    userEntries = [];
}
else {
    userEntries = JSON.parse(localStorage.getItem("userEntries"));
}

let errors = []
const retieveEntries = () => {
    let entries = localStorage.getItem('userEntries')
    if (entries) {
        entries = JSON.parse(entries)
    } else {
        entries = []
    }
    return entries
}
const displayEntries = () => {
    let entries = retieveEntries()
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.Name}</td>`
        const emailCell = `<td class='border px-4 py-2'>${entry.Email}</td>`
        const passwordCell = `<td class='border px-4 py-2'>${entry.Password}</td>`
        const dobCell = `<td class='border px-4 py-2'>${entry.Dob}</td>`
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.AcceptTerms}</td>`
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`
        return row

    }).join('\n')
    const table = ` <table class='table-auto w-full'>
    <tr>
    <th class='px-4 py-2 '>Name </th>
    <th class='px-4 py-2 '>Email </th>
    <th class='px-4 py-2 '>Password </th>
    <th class='px-4 py-2 '>Dob </th>
    <th class='px-4 py-2 '>Accepted terms? </th>
    </tr>${tableEntries}
</table>`
    let details = document.getElementById('user-entries')
    details.innerHTML = table
}

const saveUserForm = (event) => {
    event.preventDefault();
    const Name = document.getElementById('name').value
    const Email = document.getElementById('email').value
    const Password = document.getElementById('password').value
    const Dob = document.getElementById('dob').value
    const AcceptTerms = document.getElementById('acceptTerms').checked
    var currentYear = new Date().getFullYear();
    var birthYear = Dob.split("-");
    let year = birthYear[0]
    var age = currentYear - year
    console.log({ age, currentYear, birthYear })
    if (age < 18 || age > 55) {
        document.getElementById('dob').style = 'border:1px solid red'
        return alert("Age must be in between 18 and 55")

    } else {
        document.getElementById('dob').style = 'border:none'

        const entry = {
            Name,
            Email,
            Password,
            Dob,
            AcceptTerms
        }
        userEntries.push(entry);
        localStorage.setItem("userEntries", JSON.stringify(userEntries))
        displayEntries()
        userForm.reset()

    }

}
userForm.addEventListener('submit', saveUserForm)
displayEntries()


