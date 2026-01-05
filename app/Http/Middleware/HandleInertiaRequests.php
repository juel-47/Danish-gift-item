<?php

namespace App\Http\Middleware;

use App\Models\FooterInfo;
use App\Models\FooterSocial;
use App\Models\GeneralSetting;
use App\Models\LogoSetting;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $cartService = new CartService();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => Auth::guard('customer')->user(),
            ],
            'logos' => [
                'logo'    => LogoSetting::value('logo'),
                'favicon' => LogoSetting::value('favicon'),
            ],
            // 'cart' => $cartService->getCartSummary(),
            'cart' => $cartService->getNavbarCartInfo(),
            // 'footerInfo' => [
            //     'footerInfo' => FooterInfo::select('logo', 'phone', 'email', 'address', 'copyright')->first(),
            // ],
            'footerInfo' => FooterInfo::select('logo', 'phone', 'email', 'address', 'copyright')
                ->first()?->makeHidden([])->toArray() ?? [
                    'logo'       => null,
                    'phone'      => '',
                    'email'      => '',
                    'address'    => '',
                    'copyright'  => '',
                ],
            'footer_social' => FooterSocial::where('status', 1)->select('icon', 'icon_extra', 'name', 'url', 'serial_no')
                ->get()
                ->map(function ($item) {
                    return $item->only(['icon', 'icon_extra', 'name', 'url', 'serial_no']);
                }),
        ];
    }
}
