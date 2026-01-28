<?php

use App\Http\Controllers\Frontend\AuthController;
use App\Http\Controllers\Frontend\BlogController;
use App\Http\Controllers\Frontend\CartController;
use App\Http\Controllers\Frontend\CheckOutController;
use App\Http\Controllers\Frontend\FooterController;
use App\Http\Controllers\Frontend\FrontendController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\JobApplicationController;
use App\Http\Controllers\Frontend\PageController;
use App\Http\Controllers\Frontend\PaymentController;
use App\Http\Controllers\Frontend\ReviewController;
use App\Http\Controllers\Frontend\UserDashboardController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Gate;


// Welcome page
// Route::get('/', fn() => view('welcome'))->name('welcome');

Route::get('/', [HomeController::class, 'index'])->name('home');

//auth user or customer
Route::middleware('guest:customer')->group(function () {
    Route::get('/customer/register', [AuthController::class, 'showRegister'])->name('customer.register');
    Route::post('/customer-register', [AuthController::class, 'register']);

    Route::get('/customer/login', [AuthController::class, 'showLogin'])->name('customer.login');
    Route::post('/customer-login', [AuthController::class, 'login'])->name('customer.login.submit');

    Route::get('/customer/forgot-password', [AuthController::class, 'showForgotPassword'])->name('password.request');
    Route::post('/customer/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.email');

    Route::get('/customer/reset-password/{token}', [AuthController::class, 'showResetPassword'])->name('customer.password.reset');
    Route::post('/customer/reset-password', [AuthController::class, 'resetPassword'])->name('customer.password.update');

    Route::get('/resend-email', [AuthController::class, 'showResend'])
        ->name('customer.resendemail');

    //email verification route
    Route::get('/customers/verify/{id}', [AuthController::class, 'verifyEmail'])
        ->name('customers.verify');

    Route::post('/email/verification-resend', [AuthController::class, 'resendVerification'])->name('verification.resend');
});

Route::middleware(['auth:customer', 'verified'])->group(function () {

    Route::put('/update-profile', [UserDashboardController::class, 'updateProfile'])->name('update.profile');

    Route::put('/update-password', [UserDashboardController::class, 'updatePassword'])->name('update.password');

    Route::get('user-profile', [UserDashboardController::class, 'index'])->name('user.profile');

    // =====  Customer Address Controller  =====
    // Route::apiResource('customer-billing-address', CustomerAddressController::class)->only('index', 'store', 'update', 'destroy');

    // ===== Review routes ==== 
    Route::post('review', [ReviewController::class, 'create'])->name('review.create');
});
// Route::get('/resend-email/{email?}', function ($email = null) {
//     return Inertia::render('Auth/ResendEmail', [
//         'email' => $email ?? session('verification_email')
//     ]);
// })->name('customer.resendemail');

Route::post('/customer/logout', [AuthController::class, 'logout'])->name('customer.logout')->middleware('auth:customer');

Route::get('checkout', [CheckOutController::class, 'index'])->name('checkout');

Route::get('/email/verify/{id}', [AuthController::class, 'verifyEmail'])
    ->name('verification.verify')
    ->middleware('signed');


// ===== Product Detail =====
//product details:
Route::get('product-details/{slug}', [FrontendController::class, 'productDetails'])
    ->name('product-details');
Route::get('all-products', [FrontendController::class, 'allProducts'])->name('all.products');
Route::get('category/{slug}', [FrontendController::class, 'categoryProducts'])->name('category.products');
Route::get('subcategory/{slug}', [FrontendController::class, 'subcategoryProducts'])->name('subcategory.products');
Route::get('childcategory/{slug}', [FrontendController::class, 'childcategoryProducts'])->name('childcategory.products');

//cart controller 

Route::prefix('cart')->name('cart.')->group(function () {

    // Cart page
    Route::get('/', [CartController::class, 'index'])
        ->name('index');

    // Add to cart
    Route::post('/add', [CartController::class, 'addToCart'])
        ->name('add');

    // Update cart item quantity
    Route::post('/update', [CartController::class, 'updateCart'])
        ->name('update');

    // Remove single cart item
    Route::delete('/remove/{id}', [CartController::class, 'removeCart'])
        ->name('remove');

    // Clear full cart
    Route::delete('/clear', [CartController::class, 'clearCart'])
        ->name('clear');
});
Route::post('/cart/sync', [CartController::class, 'sync'])->name('cart.sync');
//check out controller
Route::post('/checkout', [PaymentController::class, 'store'])
    ->name('checkout.store')->middleware('auth:customer');

Route::get('/order/success/{order_id?}', [CheckOutController::class, 'success'])
    ->name('order.success')
    ->middleware('auth:customer');

// Payment Success/Cancel Routes
Route::get('paypal/success', [PaymentController::class, 'paypalSuccess'])->name('paypal.success');
Route::get('paypal/cancel', [PaymentController::class, 'paypalCancel'])->name('paypal.cancel');
Route::get('mobilepay/success', [PaymentController::class, 'mobilePaySuccess'])->name('mobilepay.success');
Route::get('mobilepay/cancel', [PaymentController::class, 'mobilePayCancel'])->name('mobilepay.cancel');

// page routes 
Route::controller(PageController::class)->group(function () {
    Route::get('/about', 'about')->name('about');
    Route::get('/contact', 'branch')->name('contact');
    Route::post('/contact', 'handleContactForm')->name('contact-form.submit');
});
//footer routes
Route::controller(FooterController::class)->group(function () {
    Route::get('/support-center', 'supportCenter')->name('support.center');
    Route::get('/how-to-order', 'howToOrder')->name('how.to.order');
    Route::get('/shipping-delivery', 'shippingDelivery')->name('shipping.delivery');
    Route::get('/return-policy', 'returnPolicy')->name('return.policy');
    Route::get('/privacy-policy', 'privacyPolicy')->name('privacy.policy');
    Route::get('/legal-notice', 'legalPolicy')->name('legal.policy');
});

//blog routes
Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.details');

//carrer routes
Route::get('carrer', [JobApplicationController::class, 'carrer'])->name('carrer');
Route::post('job-apply', [JobApplicationController::class, 'store'])->name('job.apply.store');

require __DIR__ . '/auth.php';

Gate::before(function ($user, $ability) {
    return $user->hasRole('SuperAdmin') ? true : null;
});

