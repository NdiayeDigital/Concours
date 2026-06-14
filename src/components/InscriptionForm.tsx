import React, { useState } from 'react';
import { useInscriptions } from '../hooks/useInscriptions';
import { Scale, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function InscriptionForm() {
  const { addInscription, loading: isSubmitting } = useInscriptions();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    ufr: '',
    filiere: '',
    niveau: '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState<string | null>(null);

  const ufrOptions = [
    { value: 'UFR-SET', label: 'UFR-SET (Sciences et Environnement et Technologie)' },
    { value: 'UFR-SES', label: 'UFR-SES (Sciences Économiques et Sociales)' },
    { value: 'UFR-SI', label: 'UFR-SI (Sciences et Ingénierie)' },
    { value: 'UFR-SANTE', label: 'UFR-SANTE (Sciences de la Santé)' },
    { value: 'IUT', label: 'IUT (Institut Universitaire de Technologie)' },
  ];

  const niveauOptions = [
    { value: 'Licence 1 (L1)', label: 'Licence 1 (L1)' },
    { value: 'Licence 2 (L2)', label: 'Licence 2 (L2)' },
    { value: 'Licence 3 (L3)', label: 'Licence 3 (L3)' },
    { value: 'Master 1 (M1)', label: 'Master 1 (M1)' },
    { value: 'Master 2 (M2)', label: 'Master 2 (M2)' },
    { value: 'Doctorat', label: 'Doctorat' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset error when user changes inputs
    setErrorMsg(null);

    // Live validation for email domain
    if (name === 'email') {
      const emailVal = value.trim().toLowerCase();
      if (emailVal === '') {
        setEmailValidationError(null);
      } else if (!emailVal.endsWith('@univ-thies.sn')) {
        setEmailValidationError("L'adresse email doit obligatoirement se terminer par '@univ-thies.sn'");
      } else {
        setEmailValidationError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Pre-check fields
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.telephone ||
      !formData.email ||
      !formData.ufr ||
      !formData.filiere ||
      !formData.niveau
    ) {
      setErrorMsg('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Double check email domain on submit
    const emailVal = formData.email.trim().toLowerCase();
    if (!emailVal.endsWith('@univ-thies.sn')) {
      setErrorMsg("L'adresse email doit se terminer par '@univ-thies.sn' (ex: prenom.nom@univ-thies.sn).");
      return;
    }

    // Call submit function from hook
    const result = await addInscription({
      nom: formData.nom.trim(),
      prenom: formData.prenom.trim(),
      telephone: formData.telephone.trim(),
      email: emailVal,
      ufr: formData.ufr,
      filiere: formData.filiere.trim(),
      niveau: formData.niveau,
    });

    if (result.success) {
      setSuccess(true);
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <section id="inscription" className="py-20 md:py-28 bg-[#F8F6F0] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center mb-8 md:mb-12 space-y-3">
          <span className="text-brand-gold-premium font-sans font-semibold tracking-widest text-[10px] sm:text-xs uppercase block">
            FORMULAIRE D'INSCRIPTION
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-blue-dark">
            Prenez votre place dans l'arène
          </h2>
          <p className="text-brand-blue-dark/65 font-sans text-xs sm:text-sm md:text-base max-w-md mx-auto px-2">
            Remplissez le formulaire ci-dessous pour valider votre candidature officielle.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border-t-8 border-brand-gold-premium overflow-hidden transition-all duration-300">
          
          {success ? (
            /* Success State */
            <div className="p-8 sm:p-12 text-center space-y-6 animate-fade-in">
              <div className="flex justify-center">
                <div className="p-4 bg-emerald-50 rounded-full text-emerald-500 animate-bounce">
                  <CheckCircle className="w-16 h-16" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-blue-dark">
                  Candidature Enregistrée !
                </h3>
                <p className="text-brand-blue-dark/75 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  Félicitations <strong>{formData.prenom} {formData.nom}</strong>. Votre inscription au Concours de Plaidoirie Universitaire 2026 de l'UIDT a été validée avec succès.
                </p>
                <div className="p-4 bg-brand-cream/80 border border-brand-gold-premium/20 rounded-xl max-w-md mx-auto mt-4 text-xs font-sans text-brand-blue-dark/70 text-left space-y-2">
                  <p><strong>Récapitulatif de votre profil :</strong></p>
                  <p>• Email : {formData.email.toLowerCase()}</p>
                  <p>• UFR : {formData.ufr}</p>
                  <p>• Niveau : {formData.niveau}</p>
                  <p className="text-brand-gold-premium font-semibold mt-2">Un responsable du Club CE DEAO vous contactera prochainement par téléphone pour les détails des phases qualificatives.</p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      nom: '',
                      prenom: '',
                      telephone: '',
                      email: '',
                      ufr: '',
                      filiere: '',
                      niveau: '',
                    });
                  }}
                  className="bg-brand-blue-dark hover:bg-brand-blue-medium text-white font-sans text-sm font-semibold py-3 px-8 rounded-lg shadow transition-all duration-300 cursor-pointer"
                >
                  Inscrire un autre candidat
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 md:p-12 space-y-6">
              
              {/* Main error message banner */}
              {errorMsg && (
                <div className="flex items-start space-x-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-sans">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Grid 2 Columns (Nom, Prénom) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="prenom" className="block text-xs font-semibold text-brand-blue-dark/75 uppercase tracking-wider font-sans">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    required
                    value={formData.prenom}
                    onChange={handleInputChange}
                    placeholder="Ex: Seydou"
                    className="w-full bg-[#F8F6F0]/40 border border-brand-blue-dark/15 focus:border-brand-gold-premium focus:ring-1 focus:ring-brand-gold-premium rounded-lg py-3 px-4 outline-none font-sans text-sm text-brand-blue-dark transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="nom" className="block text-xs font-semibold text-brand-blue-dark/75 uppercase tracking-wider font-sans">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Ex: Ndiaye"
                    className="w-full bg-[#F8F6F0]/40 border border-brand-blue-dark/15 focus:border-brand-gold-premium focus:ring-1 focus:ring-brand-gold-premium rounded-lg py-3 px-4 outline-none font-sans text-sm text-brand-blue-dark transition-all"
                  />
                </div>
              </div>

              {/* Grid 2 Columns (Téléphone, Email) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="telephone" className="block text-xs font-semibold text-brand-blue-dark/75 uppercase tracking-wider font-sans">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    required
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="Ex: +221 77 000 00 00"
                    className="w-full bg-[#F8F6F0]/40 border border-brand-blue-dark/15 focus:border-brand-gold-premium focus:ring-1 focus:ring-brand-gold-premium rounded-lg py-3 px-4 outline-none font-sans text-sm text-brand-blue-dark transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-brand-blue-dark/75 uppercase tracking-wider font-sans">
                    Email Universitaire <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ex: prenom.nom@univ-thies.sn"
                    className={`w-full bg-[#F8F6F0]/40 border focus:ring-1 rounded-lg py-3 px-4 outline-none font-sans text-sm transition-all ${
                      emailValidationError 
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500 text-red-900' 
                        : 'border-brand-blue-dark/15 focus:border-brand-gold-premium focus:ring-brand-gold-premium text-brand-blue-dark'
                    }`}
                  />
                  {emailValidationError ? (
                    <span className="text-xxs font-sans text-red-600 block mt-1">
                      {emailValidationError}
                    </span>
                  ) : (
                    <span className="text-xxs font-sans text-brand-blue-dark/45 block mt-1">
                      Doit obligatoirement se terminer par @univ-thies.sn
                    </span>
                  )}
                </div>
              </div>

              {/* Grid 2 Columns (UFR, Filière) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="ufr" className="block text-xs font-semibold text-brand-blue-dark/75 uppercase tracking-wider font-sans">
                    UFR / Institut <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ufr"
                    name="ufr"
                    required
                    value={formData.ufr}
                    onChange={handleInputChange}
                    className="w-full bg-[#F8F6F0]/40 border border-brand-blue-dark/15 focus:border-brand-gold-premium focus:ring-1 focus:ring-brand-gold-premium rounded-lg py-3 px-3 outline-none font-sans text-sm text-brand-blue-dark transition-all cursor-pointer"
                  >
                    <option value="" disabled>Sélectionnez votre UFR</option>
                    {ufrOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="filiere" className="block text-xs font-semibold text-brand-blue-dark/75 uppercase tracking-wider font-sans">
                    Filière <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="filiere"
                    name="filiere"
                    required
                    value={formData.filiere}
                    onChange={handleInputChange}
                    placeholder="Ex: Sciences Juridiques, Génie Civil..."
                    className="w-full bg-[#F8F6F0]/40 border border-brand-blue-dark/15 focus:border-brand-gold-premium focus:ring-1 focus:ring-brand-gold-premium rounded-lg py-3 px-4 outline-none font-sans text-sm text-brand-blue-dark transition-all"
                  />
                </div>
              </div>

              {/* Study Level */}
              <div className="space-y-1.5">
                <label htmlFor="niveau" className="block text-xs font-semibold text-brand-blue-dark/75 uppercase tracking-wider font-sans">
                  Niveau d'études <span className="text-red-500">*</span>
                </label>
                <select
                  id="niveau"
                  name="niveau"
                  required
                  value={formData.niveau}
                  onChange={handleInputChange}
                  className="w-full bg-[#F8F6F0]/40 border border-brand-blue-dark/15 focus:border-brand-gold-premium focus:ring-1 focus:ring-brand-gold-premium rounded-lg py-3 px-3 outline-none font-sans text-sm text-brand-blue-dark transition-all cursor-pointer"
                >
                  <option value="" disabled>Sélectionnez votre niveau</option>
                  {niveauOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Consent and Submit Button */}
              <div className="pt-4 space-y-4">
                <div className="text-xxs font-sans text-brand-blue-dark/50 leading-relaxed">
                  En soumettant ce formulaire, vous acceptez que le Club CE DEAO de l'UIDT traite vos données personnelles aux fins d'organisation de ce concours. Aucune donnée ne sera partagée à des tiers.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !!emailValidationError}
                  className="w-full bg-gradient-to-r from-brand-gold-premium to-brand-gold-light hover:from-brand-gold-light hover:to-brand-gold-premium text-brand-blue-dark font-sans font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-brand-gold-premium/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Traitement de l'inscription...</span>
                    </>
                  ) : (
                    <>
                      <Scale className="w-5 h-5" />
                      <span>⚖️ Je participe au concours</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
