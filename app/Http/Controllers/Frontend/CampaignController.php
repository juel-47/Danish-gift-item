<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\CampaignProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller
{
    public function index()
    {
        $now = now();
        $campaigns = Campaign::where('status', 1)
            ->where('start_date', '<=', $now)
            ->where('end_date', '>=', $now)
            ->orderBy('id', 'desc')
            ->get();

        $featuredCampaign = $campaigns->first();
        $featuredProducts = [];

        if ($featuredCampaign) {
            $featuredProducts = CampaignProduct::where('campaign_id', $featuredCampaign->id)
                ->with(['product' => function($query) use ($now) {
                    $query->active()->withReview()->with(['campaignProducts' => function($cq) use ($now) {
                        $cq->whereHas('campaign', function($ccq) use ($now) {
                            $ccq->where('status', 1)
                                ->where('start_date', '<=', $now)
                                ->where('end_date', '>=', $now);
                        });
                    }]);
                }])
                ->get();
        }

        return Inertia::render('CampaignPage', [
            'campaigns' => $campaigns,
            'featuredCampaign' => $featuredCampaign,
            'featuredProducts' => $featuredProducts
        ]);
    }

    public function show(string $slug)
    {
        $campaign = Campaign::where('slug', $slug)
            ->where('status', 1)
            ->firstOrFail();

        $campaignProducts = CampaignProduct::where('campaign_id', $campaign->id)
            ->with(['product' => function($query) use ($campaign) {
                $now = now();
                $query->active()->withReview()->with(['campaignProducts' => function($cq) use ($now) {
                    $cq->whereHas('campaign', function($ccq) use ($now) {
                        $ccq->where('status', 1)
                            ->where('start_date', '<=', $now)
                            ->where('end_date', '>=', $now);
                    });
                }]);
            }])
            ->get();

        return Inertia::render('CampaignDetailPage', [
            'campaign' => $campaign,
            'campaignProducts' => $campaignProducts
        ]);
    }
}
