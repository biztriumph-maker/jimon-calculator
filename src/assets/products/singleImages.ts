const imageModules = import.meta.glob<string>('./T*.png', {
  eager: true,
  import: 'default',
})

const verifiedImagePaths: Record<string, string> = {
  'single-02': './T02_five_stage_set_B_xuelanduo.png',
  'single-03': './T03_birunkan.png',
  'single-04': './T04_syan_yun_yu_zhirotopka.png',
  'single-05': './T05_kostnyy_peptidnyy_kollagen.png',
  'single-06': './T06_peptidnaya_lnyanaya_kasha_s_kollagenom.png',
  'single-07': './T07_syue_lan_do_krovochistka.png',
  'single-08': './T08_pochechnyy_s_zhenshenem_i_dudnikom.png',
  'single-09': './T09_chudo_karandash_bakteriostaticheskaya_zhidkost.png',
  'single-10': './T10_sprey_sulancho_snezhnaya_orhideya.png',
  'single-11': './T11_mozgovoy_s_maslom_semyan_klena.png',
  'single-12': './T12_isha_yan_mey_antibakterialnyy_kompleks.png',
  'single-15': './T15_czinmu_pressovannye_konfety_s_cikoriem.png',
  'single-16': './T16_baocin_pressovannye_tabletki_s_peptidami_iz_kostnogo_mozga_krs.png',
  'single-17': './T17_napitok_dlya_podderzhki_legkih_i_dyhatelnyh_putey.png',
  'single-18': './T18_napitok_dlya_podderzhki_pecheni_s_kurkumoy.png',
  'single-19': './T19_napitok_dlya_podderzhki_zheludka_i_pischevaritelnoy_sistemy.png',
  'single-20': './T20_poroshok_iz_chernogo_nefrita_dlya_vanny.png',
  'single-21': './T21_napitok_dlya_kompleksnogo_pitaniya_kozhi.png',
  'single-22': './T22_toniziruyuschiy_produkt_s_zhenshenem_i_dendrobiumom.png',
  'single-23': './T23_premialnyy_nabor_iz_6_sredstv.png',
  'single-24': './T24_ochischayuschiy_gel_dlya_umyvaniya_aura_curu_2_sht.png',
  'single-25': './T25_sprey_dlya_lica_aura_curu_s_lifting_effektom.png',
  'single-26': './T26_antivozrastnoe_maslo_eliksir_aura_curu.png',
  'single-27': './T27_anti_age_syvorotka_dlya_kozhi_vokrug_glaz_aura_curu.png',
  'single-28': './T28_anti_age_krem_dlya_lica_snow_orchid.png',
  'single-29': './T29_antivozrastnaya_maska_dlya_lica_aura_curu.png',
  'single-31': './T31_massazhnyy_travyanoy_krem_kele_sho.png',
  'single-32': './T32_ampulnaya_syvorotka_niyouyan.png',
  'single-33': './T33_lisiyan_antibakterialnaya_zhidkost_s_lizocimom.png',
  'single-34': './T34_lisiyan_penyascheesya_ochischayuschee_sredstvo.png',
  'single-35': './T35_lisiyan_gel_s_lizocimom.png',
  'single-36': './T36_chay_s_kassiey_i_ulunom.png',
}

export const singleProductImages: Record<string, string> = Object.fromEntries(
  Object.entries(verifiedImagePaths).map(([productId, imagePath]) => {
    const image = imageModules[imagePath]

    if (!image) {
      throw new Error(`Missing verified single product image: ${imagePath}`)
    }

    return [productId, image]
  }),
)
