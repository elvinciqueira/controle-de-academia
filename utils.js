module.exports = {
  age: function (timestamps) {
    const today = new Date()
    const birthDate = new Date(timestamps)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth - birthDate.getMonth()

    if (month < 0 || month === 0 && today.getDate() <= birthDate.getDate()) {
      age -= 1
    }

    return age
  }
}
