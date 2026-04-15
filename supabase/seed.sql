insert into cities (slug, name, country)
values
  ('dubai', 'Dubai', 'UAE'),
  ('doha', 'Doha', 'Qatar'),
  ('riyadh', 'Riyadh', 'Saudi Arabia')
on conflict (slug) do nothing;
