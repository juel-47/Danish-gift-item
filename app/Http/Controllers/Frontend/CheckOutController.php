<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\CustomerAddress;
use App\Models\PickupShippingMethod;
use App\Models\ShippingRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckOutController extends Controller
{
    public function index()
    {
        $user = Auth::guard('customer')->user();

        if (!$user) {
            return redirect()->route('customer.login')->with('error', 'Please login to checkout.');
        }

        $shippingMethods = ShippingRule::where('status', 1)
            ->select('id', 'name', 'type', 'cost')
            ->get();

        $pickupMethods = PickupShippingMethod::where('status', 1)->get();

        $countryList = config('settings.country_list', []);

        $customerAddresses = CustomerAddress::where('customer_id', $user->id)->get();

        return Inertia::render('CheckoutPage', [
            'shipping_methods' => $shippingMethods,
            'pickup_methods'   => $pickupMethods,
            'countries'        => $countryList,
            'customer_addresses' => $customerAddresses,
        ]);
    }

    public function success()
    {
        return Inertia::render('OrderSuccessPage');
    }
}
