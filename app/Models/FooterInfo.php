<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class FooterInfo extends Model
{
    protected $fillable = [
        'logo',
        'phone',
        'email',
        'address',
        'copyright'
    ];

    public function getLogoAttribute($value)
    {
        if ($value && !str_starts_with($value, 'http') && !str_starts_with($value, 'storage/')) {
            return 'storage/' . $value;
        }
        return $value;
    }

    protected static function booted()
    {
        $refreshCache = function () {
            Cache::forget('footer_data');
            Cache::remember('footer_data', 3600, function () {
                return FooterInfo::select('logo', 'phone', 'email', 'address', 'copyright')
                    ->get()
                    ->map(function ($item) {
                        return $item->only(['logo', 'phone', 'email', 'address', 'copyright']);
                    })->first();
            });
        };

        static::created($refreshCache);
        static::updated($refreshCache);
        static::deleted($refreshCache);
    }
}
