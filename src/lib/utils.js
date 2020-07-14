module.exports = {
  age(timestamps) {
    const today = new Date();
    const birthDate = new Date(timestamps);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() <= birthDate.getDate())) {
      age -= 1;
    }

    return age;
  },

  date(timestamps) {
    const date = new Date(timestamps);

    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
    };
  },
};
