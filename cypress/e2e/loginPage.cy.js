// ── IMPORT ──
import LoginPage from '../support/POM/LoginPage'
// Mengimpor class LoginPage dari folder POM (Page Object Model)
// Class ini berisi semua locator dan method untuk halaman login

// ── TEST SUITE ──
describe('Page Object Model - Login Page', () => {

    const loginPage = new LoginPage()
    // Membuat instance/object dari class LoginPage
    // Object ini digunakan untuk memanggil method-method di LoginPage

    let loginData
    // Deklarasi variabel untuk menyimpan data test dari fixture

    before(() => {
        cy.fixture('users/loginUsers').then((data) => {
            loginData = data
        })
    })
    // before() → Hook yang berjalan SEKALI sebelum semua test case dimulai
    // cy.fixture() → Membaca file JSON dari folder cypress/fixtures/users/loginUsers.json
    // .then() → Setelah data dibaca, simpan ke variabel loginData

    // ═══════════════════════════════════════════════
    // POSITIVE TEST
    // ═══════════════════════════════════════════════
    it('TC01 - Berhasil login dengan kredensial valid', () => {
    // it() → Mendefinisikan 1 test case individual
    // Parameter 1: Nama test case
    // Parameter 2: Callback berisi langkah-langkah test

        const { user_name, password } = loginData.validLogin
        // Destructuring → Mengambil user_name dan password dari object loginData.validLogin
        // Contoh: { user_name: "standard_user", password: "secret_sauce" }

        loginPage.visit()
        // Memanggil method visit() dari LoginPage → membuka halaman login

        loginPage.login(user_name, password)
        // Memanggil method login() → mengisi username, password, lalu klik tombol login

        loginPage.verifyLoginSuccess()
        // Memanggil method verifyLoginSuccess() → memverifikasi bahwa login berhasil
        // Biasanya cek URL atau elemen yang muncul setelah login
    })

    // ═══════════════════════════════════════════════
    // NEGATIVE TEST
    // ═══════════════════════════════════════════════
    it('TC02 - Gagal login dengan kredensial tidak valid', () => {

        const { user_name, password } = loginData.invalidLogin
        // Mengambil kredensial yang salah dari loginData.invalidLogin

        loginPage.visit()
        loginPage.login(user_name, password)

        loginPage.verifyLoginFailed()
        // Memverifikasi bahwa login GAGAL
        // Biasanya cek apakah muncul error message
    })
})
