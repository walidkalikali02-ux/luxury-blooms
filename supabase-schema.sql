-- زهور الفخامة | Luxury Blooms - Supabase Schema

create table if not exists products (
  id bigserial primary key,
  name_ar text not null,
  name_en text not null,
  description_ar text,
  description_en text,
  price numeric(10, 2) not null default 0,
  currency text not null default 'QAR',
  image_url text,
  category text not null default 'باقات الورود',
  in_stock boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table products enable row level security;

-- Public read access
create policy "Public can read products"
  on products for select
  using (true);

-- Sample products
insert into products (name_ar, name_en, description_ar, description_en, price, currency, image_url, category, in_stock, is_featured) values
  (
    'باقة الورد الملكي',
    'Royal Rose Bouquet',
    'باقة فاخرة من أجمل الورود الحمراء والبيضاء، مثالية للمناسبات الخاصة والهدايا الراقية',
    'Luxurious bouquet of the finest red and white roses, perfect for special occasions',
    250, 'QAR',
    'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=600&h=600&fit=crop',
    'باقات الورود', true, true
  ),
  (
    'ترتيب الأوركيد الفاخر',
    'Luxury Orchid Arrangement',
    'تشكيلة راقية من زهور الأوركيد النادرة في تصميم عصري يجمع الفخامة بالأناقة',
    'Elegant collection of rare orchids in a modern design combining luxury and grace',
    380, 'QAR',
    'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=600&h=600&fit=crop',
    'الباقات الملكية', true, true
  ),
  (
    'إكليل العروس الفاخر',
    'Bridal Crown Bouquet',
    'باقة العروس الأحلام، مصنوعة من أبيض الزهور وأجمل الخضرة لتكتمل جمال يومك',
    'The dream bridal bouquet, crafted from the whitest flowers and finest greenery',
    550, 'QAR',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=600&fit=crop',
    'زهور عروس', true, true
  ),
  (
    'باقة الياسمين المسائي',
    'Evening Jasmine Bouquet',
    'عطر الياسمين الأبيض في باقة سحرية تفوح بأجمل العطور الطبيعية',
    'White jasmine fragrance in a magical bouquet that radiates the most beautiful natural scents',
    180, 'QAR',
    'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&h=600&fit=crop',
    'باقات الورود', true, false
  ),
  (
    'تشكيلة الذهب والأزرق',
    'Gold & Blue Collection',
    'تشكيلة مستوحاة من الفن العربي الإسلامي، بألوان الذهبي والأزرق الملكي',
    'A collection inspired by Islamic Arabic art, in gold and royal blue tones',
    650, 'QAR',
    'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=600&h=600&fit=crop',
    'الباقات الملكية', true, false
  ),
  (
    'صندوق الهدايا الزهري',
    'Floral Gift Box',
    'صندوق هدايا فاخر يضم مجموعة من أجمل الزهور المجففة والطازجة مع شوكولاتة بلجيكية',
    'Luxury gift box containing a selection of the finest dried and fresh flowers with Belgian chocolate',
    420, 'QAR',
    'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=600&h=600&fit=crop',
    'هدايا فاخرة', false, false
  );
