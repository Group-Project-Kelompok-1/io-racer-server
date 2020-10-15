function randomSoal() {
  let soal = []
  for (let i = 0; i < 20; i++) {
    let key = [37, 38, 39, 40]
    soal.push(key[Math.floor(Math.random() * 4)])
  }
  return soal
}

module.exports = randomSoal