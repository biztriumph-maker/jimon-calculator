const imageModules = import.meta.glob<string>('./K*.png', {
  eager: true,
  import: 'default',
})

const verifiedImagePaths: Record<string, string> = {
  'bundle-01': './K01_chay_s_kassiey_i_ulunom_komplekt_5_korobok.png',
  'bundle-02': './K02_ampulnaya_syvorotka_niyouyan_komplekt_5_korobok.png',
  'bundle-03': './K03_massazhnyy_travyanoy_krem_kele_sho_komplekt_5_korobok.png',
  'bundle-04': './K04_sprey_dlya_litsa_aura_curu_niyouyan_komplekt_5_korobok.png',
  'bundle-05': './K05_lisiyan_antibakterialnaya_zhidkost_s_lizotsimom_komplekt_5_k.png',
  'bundle-06': './K06_lisiyan_penyascheesya_ochischayuschee_sredstvo_komplekt_5_ko.png',
  'bundle-07': './K07_ochischayuschee_sredstvo_aura_curu_niyouyan_komplekt_5_korob.png',
  'bundle-08': './K08_antivozrastnoe_maslo_eliksir_aura_curu_niyouyan_komplekt_5_k.png',
  'bundle-09': './K09_antivozrastnaya_maska_dlya_litsa_aura_curu_niyouyan_komplekt.png',
  'bundle-10': './K10_anti_age_syvorotka_dlya_kozhi_vokrug_glaz_aura_curu_komplekt.png',
  'bundle-11': './K11_lisiyan_gel_s_lizotsimom_komplekt_5_korobok.png',
  'bundle-12': './K12_sprey_sulancho_snezhnaya_orhideya_komplekt_5_korobok.png',
  'bundle-13': './K13_napitok_dlya_podderzhki_legkih_i_dyhatelnyh_putey_komplekt_5.png',
  'bundle-14': './K14_napitok_dlya_podderzhki_pecheni_s_kurkumoy_komplekt_5_korobo.png',
  'bundle-15': './K15_kostnyy_peptidnyy_kollagen_komplekt_5_korobok.png',
  'bundle-16': './K16_birunkan_komplekt_5_korobok.png',
  'bundle-17': './K17_syan_yun_yu_zhirotopka_komplekt_5_korobok.png',
  'bundle-18': './K18_tszinmu_pressovannye_tabletki_s_tsikoriem_komplekt_5_korobok.png',
  'bundle-19': './K19_baotsin_peptidy_iz_kostnogo_mozga_krs_komplekt_5_korobok.png',
  'bundle-20': './K20_anti_age_krem_dlya_litsa_snow_orchid_komplekt_5_korobok.png',
  'bundle-21': './K21_poroshok_iz_chernogo_nefrita_dlya_vanny_komplekt_10_korobok.png',
  'bundle-22': './K22_mozgovoy_s_maslom_semyan_klena_komplekt_5_korobok.png',
  'bundle-23': './K23_napitok_dlya_kompleksnogo_pitaniya_kozhi_komplekt_5_korobok.png',
  'bundle-24': './K24_isha_yan_mey_antibakterialnyy_kompleks_komplekt_5_korobok.png',
  'bundle-25': './K25_toniziruyuschiy_produkt_s_zhenshenem_i_dendrobiumom_komplekt.png',
  'bundle-26': './K26_pochechnyy_s_zhenshenem_i_dudnikom_komplekt_5_korobok.png',
  'bundle-27': './K27_syue_lan_do_krovochistka_komplekt_5_korobok.png',
  'bundle-28': './K28_chudo_karandash_bakteriostaticheskaya_zhidkost_komplekt_5_ko.png',
}

export const complexProductImages: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(verifiedImagePaths).map(([productId, imagePath]) => {
    const image = imageModules[imagePath]
    if (!image) throw new Error(`Missing verified complex image: ${imagePath}`)
    return [productId, image]
  }),
)
