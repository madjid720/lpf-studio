import React, { useState, useRef } from "react";


// ── DATA ──────────────────────────────────────────────────────────────────────
const ctrData = [
  {t:"La VITESSE de FLASH en vrai, ça donne quoi ?",ctr:10.7,views:245168,fmt:"fait-quoi"},
  {t:"La rapidité de ROCK LEE, en VRAI",ctr:8.8,views:119139,fmt:"entrainement"},
  {t:"Le PIRE des MEILLEURS super-pouvoirs (voler)",ctr:8.4,views:151770,fmt:"pire-pouvoir"},
  {t:"Comment entrer dans la Zone — Kuroko no Basket",ctr:8.4,views:168133,fmt:"entrainement"},
  {t:"Comment devenir BAKI (bonne chance...)",ctr:7.7,views:219791,fmt:"entrainement"},
  {t:"Courir comme dans NARUTO, ça marche !",ctr:7.8,views:124583,fmt:"entrainement"},
  {t:"Avoir le Sharingan en vrai, ça fait quoi ?",ctr:7.3,views:238380,fmt:"fait-quoi"},
  {t:"Comment tuer HOMELANDER ?",ctr:7.3,views:102130,fmt:"pire-pouvoir"},
  {t:"Pourquoi VENOM serait le PIRE pouvoir à avoir en VRAI ?",ctr:6.8,views:102361,fmt:"pire-pouvoir"},
  {t:"Avoir la META VISION de BLUE LOCK en VRAI",ctr:7.2,views:151625,fmt:"possible"},
  {t:"Avoir TOUS les DÔJUTSU de NARUTO en vrai",ctr:6.3,views:92074,fmt:"fait-quoi"},
  {t:"Avoir la PUISSANCE d'un SUPER SAIYAN en VRAI ?",ctr:6.1,views:151080,fmt:"possible"},
  {t:"Jujutsu Kaisen — Les pouvoirs de GOJO en vrai",ctr:6.0,views:174103,fmt:"fait-quoi"},
  {t:"Pourquoi PERSONNE ne voudrait être WOLVERINE en VRAI ?",ctr:6.0,views:308499,fmt:"pire-pouvoir"},
  {t:"Se prendre l'ATTAQUE de GOJO SATORU (compil JJK)",ctr:5.6,views:108409,fmt:"fait-quoi"},
  {t:"Comment survivre aux zombies de All of us are dead ?",ctr:5.3,views:310376,fmt:"survivre"},
  {t:"Devenir Spiderman en VRAI, c'est possible ? (compilation)",ctr:5.9,views:183894,fmt:"possible"},
  {t:"Devenir BATMAN en VRAI, ça coûte COMBIEN ?",ctr:5.2,views:80556,fmt:"combien"},
  {t:"Devenir ZENITSU en VRAI, c'est possible?",ctr:5.2,views:22569,fmt:"possible"},
  {t:"Devenir IRON MAN en VRAI, ça coûte COMBIEN ?",ctr:4.8,views:90186,fmt:"combien"},
];

const ideas = [
  {id:1,cat:'anime',b:'purple',bl:'🔥 JJK S3 en cours',t:"Pourquoi le DOMAINE D'EXPANSION de SUKUNA serait MORTEL en vrai ?",d:"JJK S3 diffusée depuis jan 2026 — pic d'audience massif.",score:98,v:'100K–250K',s:'+500',timing:'🟢 Maintenant',ctr_pred:'8–10%'},
  {id:2,cat:'marvel',b:'amber',bl:'🎬 Film juil 2026',t:"Pourquoi SPIDER-MAN ne pourrait PAS exister en vrai ? (Brand New Day)",d:"Spider-Man: Brand New Day sort le 29 juillet 2026.",score:97,v:'120K–300K',s:'+600',timing:'🟡 Juillet 2026',ctr_pred:'7–9%'},
  {id:3,cat:'marvel',b:'red',bl:'🎬 Film déc 2026',t:"Pourquoi DOCTOR DOOM serait le PIRE super-vilain à affronter en vrai ?",d:"Avengers Doomsday sort déc 2026. Format 'PIRE à affronter'.",score:96,v:'80K–200K',s:'+450',timing:'🟡 Nov 2026',ctr_pred:'8–11%'},
  {id:4,cat:'anime',b:'coral',bl:'🔥 Demon Slayer Infinity',t:"L'ENTRAÎNEMENT de TANJIRO en vrai, c'est POSSIBLE ?",d:"Arc Infinity Castle = saison la plus attendue.",score:95,v:'80K–180K',s:'+400',timing:'🟢 Maintenant',ctr_pred:'8–10%'},
  {id:5,cat:'f1',b:'teal',bl:'🏎️ Saison F1 en cours',t:"Pourquoi un humain NORMAL ne peut pas piloter une F1 ?",d:"Saison 2026 en cours. Nouvelles règles moteur = angle science parfait.",score:95,v:'60K–180K',s:'+400',timing:'🟢 Maintenant',ctr_pred:'7–9%'},
  {id:6,cat:'anime',b:'purple',bl:'🔥 Steel Ball Run mars 2026',t:"Les POUVOIRS de GIORNO en vrai selon la science (JoJo Steel Ball Run)",d:"JoJo Steel Ball Run sorti le 19 mars sur Netflix.",score:93,v:'50K–130K',s:'+300',timing:'🟢 Maintenant',ctr_pred:'7–9%'},
  {id:7,cat:'marvel',b:'amber',bl:'🎬 Disney+ 2026',t:"Pourquoi WOLVERINE serait impossible à tuer en vrai ? (X-Men 97 S2)",d:"X-Men '97 saison 2 sur Disney+ en 2026.",score:92,v:'60K–150K',s:'+350',timing:'🟢 Maintenant',ctr_pred:'8–10%'},
  {id:8,cat:'anime',b:'coral',bl:'⏰ Frieren S2 jan 2026',t:"La MAGIE de FRIEREN en vrai, c'est POSSIBLE selon la science ?",d:"Frieren S2 depuis jan 2026. Zéro vidéo dans ton catalogue.",score:90,v:'40K–100K',s:'+250',timing:'🟢 Maintenant',ctr_pred:'6–8%'},
  {id:9,cat:'f1',b:'teal',bl:'🏎️ Nouveau format',t:"COMBIEN de CALORIES pour faire un tour de Monaco en F1 ?",d:"Format 'calories' + F1. Monaco GP le 7 juin.",score:89,v:'40K–100K',s:'+250',timing:'🟡 Mai 2026',ctr_pred:'7–9%'},
  {id:10,cat:'calories',b:'green',bl:'🆕 Nouveau format',t:"COMBIEN de CALORIES pour faire un KAMEHAMEHA en vrai ?",d:"Lancement de ta série 'calories pour...'.",score:88,v:'50K–120K',s:'+280',timing:'🟢 Maintenant',ctr_pred:'7–9%'},
  {id:11,cat:'anime',b:'purple',bl:'⏰ MHA film été 2026',t:"Tous les POUVOIRS de DEKU en vrai — classement scientifique",d:"Film MHA Heroes Rising prévu été 2026.",score:87,v:'40K–100K',s:'+220',timing:'🟡 Été 2026',ctr_pred:'6–8%'},
  {id:12,cat:'marvel',b:'amber',bl:'🎬 Disney+ mars 2026',t:"Pourquoi DAREDEVIL serait le super-héros le PLUS CRÉDIBLE en vrai ?",d:"Daredevil Born Again S2 depuis mars 2026.",score:86,v:'35K–90K',s:'+200',timing:'🟢 Maintenant',ctr_pred:'6–8%'},
];

const newFormats = [
  {id:1,icon:'🔥',titre:"Calories pour [coup spécial]",desc:"Combien de calories pour effectuer le Kamehameha, le coup de pied de Sanji, le Rasengan ? Classement évolutif = fidélisation.",exemples:["Kamehameha (DBZ)","Coup de pied de Sanji","Rasengan / Chidori","Detroit Smash (MHA)"],potentiel:'🟢 Fort',ctr_pred:'7–9%',fidelisation:'⭐⭐⭐⭐⭐'},
  {id:2,icon:'💪',titre:"L'entraînement de [perso] en vrai",desc:"Format prouvé (Baki 219K, Rock Lee 119K). À étendre à la F1, sport réel, nouveaux animes.",exemples:["Pilote F1","Cristiano Ronaldo","Tanjiro — Demon Slayer","Batman"],potentiel:'🟢 Fort',ctr_pred:'8–10%',fidelisation:'⭐⭐⭐⭐'},
  {id:3,icon:'🏎️',titre:"[Sport réel] expliqué par la science",desc:"Ta formule appliquée au sport réel. F1 en cours, Mondial foot 2026 en été.",exemples:["Pourquoi un humain ne peut pas piloter une F1 ?","Les G-forces en F1, ça fait quoi ?","Pourquoi Ronaldo saute plus haut ?"],potentiel:'🟢 Fort',ctr_pred:'7–9%',fidelisation:'⭐⭐⭐'},
  {id:4,icon:'📺',titre:"J'ai regardé [série streaming] pour analyser la science",desc:"Format natif streaming. Surfe sur les pics de diffusion (JJK S3, Frieren S2...).",exemples:["J'ai regardé JJK S3 pour analyser les domaines d'expansion","J'ai regardé Frieren pour comprendre la magie"],potentiel:'🟡 Moyen-Fort',ctr_pred:'6–8%',fidelisation:'⭐⭐⭐'},
  {id:5,icon:'🏆',titre:"Classement scientifique des [X]",desc:"Format liste classée = débats commentaires → boost algo.",exemples:["Top 5 des pouvoirs les PLUS impossibles en vrai","Classement des personnages les plus réalistes"],potentiel:'🟡 Moyen-Fort',ctr_pred:'7–9%',fidelisation:'⭐⭐⭐⭐'},
  {id:6,icon:'❓',titre:"[Personnage] n'est PAS ce que tu crois",desc:"Angle contre-narratif. Fort taux de partage.",exemples:["Saitama n'est PAS le plus fort (la science le prouve)","Batman est MOINS réaliste qu'on croit"],potentiel:'🟡 Moyen',ctr_pred:'6–8%',fidelisation:'⭐⭐'},
];

const videosPubliees = [
  {titre:'Devenir Spider Man en vrai, ça coûte combien ?',date:'2026-03-01',vues:49097,ctr:3.58},
  {titre:'La SEULE façon de SURVIVRE à Alice in Borderland',date:'2025-10-22',vues:7121,ctr:3.6},
  {titre:'Un HUMAIN peut-il devenir un AVATAR, en VRAI ?',date:'2025-12-17',vues:32745,ctr:4.13},
  {titre:'Les PIRES FRUITS du DÉMONS à avoir EN VRAI',date:'2025-12-03',vues:7159,ctr:3.82},
  {titre:'Devenir ZENITSU en VRAI, c\'est possible?',date:'2025-08-03',vues:22571,ctr:4.4},
  {titre:'Avoir le Haki en vrai, c\'est possible ? (Compilation)',date:'2025-06-25',vues:24433,ctr:5.08},
];

const suggestions2026 = [
  {titre:"Pourquoi le DOMAINE D'EXPANSION de SUKUNA serait MORTEL en vrai ?",raison:'JJK S3 diffusée depuis jan 2026 — audience au pic',urgence:'🔴 Urgent',score:98,cat:'anime',pubCible:'2026-05-04',pourquoi:'JJK S3 est en cours de diffusion maintenant. Chaque semaine sans vidéo = opportunité manquée.'},
  {titre:"Pourquoi STEEL BALL RUN serait IMPOSSIBLE en vrai ? (JoJo Netflix)",raison:'JoJo Steel Ball Run sorti le 19 mars sur Netflix',urgence:'🔴 Urgent',score:93,cat:'anime',pubCible:'2026-05-10',pourquoi:'Sorti il y a 5 semaines — encore dans la fenêtre d\'engagement.'},
  {titre:"L'ENTRAÎNEMENT d'un PILOTE F1 en vrai, c'est POSSIBLE ?",raison:'GP Monaco 7 juin · Hamilton chez Ferrari · Nouvelle réglementation 2026',urgence:'🟡 Avant juin',score:95,cat:'f1',pubCible:'2026-05-17',pourquoi:'GP Monaco le 7 juin = pic médiatique F1. Publier 3 semaines avant.'},
  {titre:"COMBIEN de CALORIES pour faire un KAMEHAMEHA en vrai ?",raison:'Lancement de ta série calories — format fidélisation',urgence:'🟢 Flexible',score:88,cat:'format',pubCible:'2026-05-31',pourquoi:'Pas lié à une actu — flexible. Mais plus tôt tu lances la série, mieux c\'est.'},
  {titre:"L'ENTRAÎNEMENT de TANJIRO en vrai, c'est POSSIBLE ?",raison:'Demon Slayer Infinity Castle — arc le plus attendu',urgence:'🟢 Été 2026',score:95,cat:'anime',pubCible:'2026-06-28',pourquoi:'Demon Slayer Infinity Castle attendu en été 2026.'},
  {titre:"Pourquoi SPIDER-MAN ne pourrait PAS exister en vrai ? (Brand New Day)",raison:'Film sort le 29 juillet 2026 au cinéma',urgence:'🟡 Début juillet',score:97,cat:'marvel',pubCible:'2026-07-05',pourquoi:'Publier 3-4 semaines avant la sortie = tu captes les recherches pré-film.'},
  {titre:"La physique du COUP DE PIED de SANJI en vrai, ça donne quoi ?",raison:'One Piece arc actuel · Sanji très populaire',urgence:'🟢 Maintenant',score:86,cat:'anime',pubCible:'2026-06-14',pourquoi:'One Piece est en diffusion continue. Bon complément à tes vidéos Gear 5.'},
  {titre:"Pourquoi DOCTOR DOOM serait le PIRE super-vilain à affronter en vrai ?",raison:'Avengers: Doomsday sort le 16 décembre 2026',urgence:'🔵 Novembre',score:96,cat:'marvel',pubCible:'2026-11-22',pourquoi:'Publier 3-4 semaines avant. Novembre = Q4 = RPM au max. Double bénéfice.'},
];

const maintenanceChecklist=[
  {t:'Relancer export_complet.py (quand quota ok)',f:'mensuel'},
  {t:'Exporter CSVs YouTube Studio (Contenu, Audience, RPM)',f:'mensuel'},
  {t:'Capture "Chaînes regardées par ton audience"',f:'mensuel'},
  {t:'Capture "Populaire auprès de différentes audiences"',f:'mensuel'},
  {t:'Vérifier expiration token.pickle',f:'tous les 7 jours'},
  {t:'Google Trends FR — ta niche',f:'hebdomadaire'},
  {t:'Calendrier sorties anime/Marvel/streaming',f:'mensuel'},
  {t:'vidIQ keyword explorer avant chaque vidéo',f:'avant chaque vidéo'},
  {t:'Glisser tous les fichiers dans Claude pour mise à jour',f:'mensuel'},
];

const ETAPES=['Titre & Miniature','Recherche','Script','Tournage','Montage','Publication'];
const ETAPE_DUREE=[2,3,4,2,3,0];
const RYTHME_JOURS=14;
const COLS=['Idée','Titre & Miniature','Recherche','Script','Tournage','Publié'];
const COL_BG=['#ede9fe','#fef9c3','#fef3c7','#dbeafe','#dcfce7','#f3f4f6'];
const COL_DOT=['#7c3aed','#ca8a04','#d97706','#2563eb','#16a34a','#6b7280'];

const FORMAT_KEYWORDS={
  'pire-pouvoir':['pire','catastrophe','cauchemar','problème','inconvénient','impossible'],
  'combien':['coûte','combien','prix','euros','budget','dépense','acheter'],
  'possible':['possible','science','réel','réalité','vrai','explication','selon'],
  'survivre':['survivre','survie','échapper','fuir','résister','défendre'],
  'fait-quoi':['fait quoi','effet','conséquence','impact','ressent','produit','donne quoi'],
  'entrainement':['entraînement','devenir','muscl','force','vitesse','rapidité','courir'],
  'calories':['calorie','énergie','joule','dépense','brûler'],
};
const detectFormat=(body)=>{
  const lower=body.toLowerCase();
  let best=null,bestScore=0;
  Object.entries(FORMAT_KEYWORDS).forEach(([fmt,kws])=>{
    const score=kws.reduce((a,kw)=>a+(lower.includes(kw)?1:0),0);
    if(score>bestScore){bestScore=score;best=fmt;}
  });
  return best;
};

const BADGE={purple:{background:'#ede9fe',color:'#5b21b6'},green:{background:'#dcfce7',color:'#15803d'},amber:{background:'#fef3c7',color:'#92400e'},coral:{background:'#fee2e2',color:'#991b1b'},teal:{background:'#ccfbf1',color:'#0f766e'},red:{background:'#fee2e2',color:'#b91c1c'},blue:{background:'#dbeafe',color:'#1d4ed8'}};
function Badge({color,children}){return <span style={{fontSize:11,padding:'2px 8px',borderRadius:20,fontWeight:500,whiteSpace:'nowrap',...(BADGE[color]||BADGE.purple)}}>{children}</span>;}
function ScoreBar({score,max=100,color='#7c3aed'}){return(<div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}><div style={{flex:1,height:3,background:'#e5e7eb',borderRadius:2}}><div style={{width:`${(score/max)*100}%`,height:'100%',background:color,borderRadius:2}}/></div><span style={{fontSize:11,color:'#6b7280',width:28,textAlign:'right'}}>{score}</span></div>);}
function Btn({label,onClick,primary,small,danger,disabled}){return(<button onClick={onClick} disabled={disabled} style={{fontSize:small?11:13,padding:small?'4px 10px':'7px 14px',borderRadius:7,border:`1px solid ${danger?'#fca5a5':primary?'#7c3aed':'#d1d5db'}`,background:danger?'#fee2e2':primary?'#7c3aed':'none',color:danger?'#dc2626':primary?'#fff':'#6b7280',cursor:disabled?'not-allowed':'pointer',fontWeight:primary?500:400,opacity:disabled?.6:1}}>{label}</button>);}
function Card({children,style={}}){return <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,padding:'14px 16px',marginBottom:8,...style}}>{children}</div>;}
function Textarea({value,onChange,placeholder,rows=4}){return <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #e5e7eb',fontSize:13,fontFamily:'system-ui,sans-serif',resize:'vertical',boxSizing:'border-box',color:'#111827',lineHeight:1.6}}/>;}
function Input({value,onChange,placeholder}){return <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:'100%',padding:'8px 12px',borderRadius:8,border:'1px solid #e5e7eb',fontSize:13,fontFamily:'system-ui,sans-serif',boxSizing:'border-box',color:'#111827'}}/>;}

function addDays(dateStr,days){const d=new Date(dateStr);d.setDate(d.getDate()+days);return d.toISOString().split('T')[0];}
function formatDate(dateStr){if(!dateStr)return'';const d=new Date(dateStr);return d.toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'});}
function daysUntil(dateStr){const diff=new Date(dateStr)-new Date();return Math.ceil(diff/(1000*60*60*24));}
function prochainsDimanches(n=12){const dimanches=[];let d=new Date();const jour=d.getDay();d.setDate(d.getDate()+(jour===0?7:(7-jour)));for(let i=0;i<n;i++){dimanches.push(d.toISOString().split('T')[0]);d.setDate(d.getDate()+14);}return dimanches;}

// ── WORKSHOP TITRES ───────────────────────────────────────────────────────────
function WorkshopTitres(){
  const [idees,setIdees]=useState([
    {id:1,sujet:'Gear 5 en vrai',titrePropose:'Pourquoi GEAR 5 serait le PIRE pouvoir à avoir en vrai ?',statut:'brut',note:null,feedback:'',conseils:[],alternatives:[]},
    {id:2,sujet:'Pilote F1',titrePropose:"L'ENTRAÎNEMENT d'un PILOTE F1 en vrai, c'est POSSIBLE ?",statut:'brut',note:null,feedback:'',conseils:[],alternatives:[]},
  ]);
  const [sujet,setSujet]=useState('');
  const [titre,setTitre]=useState('');
  const [loading,setLoading]=useState(null);
  const [view,setView]=useState(null);

  const STATUT={
    'brut':{label:'💬 À évaluer',bg:'#f3f4f6',tc:'#6b7280'},
    'évalué':{label:'✅ Évalué',bg:'#dbeafe',tc:'#1d4ed8'},
    'validé':{label:'🏆 Validé',bg:'#dcfce7',tc:'#15803d'},
    'revu':{label:'🔄 À retravailler',bg:'#fef3c7',tc:'#92400e'},
  };

  const add=()=>{
    if(!titre.trim())return;
    setIdees(prev=>[{id:Date.now(),sujet:sujet.trim(),titrePropose:titre.trim(),statut:'brut',note:null,feedback:'',conseils:[],alternatives:[]},...prev]);
    setSujet('');setTitre('');
  };

  const evaluer=async(id)=>{
    setLoading(id);
    const idee=idees.find(i=>i.id===id);
    const prompt=`Tu es un expert en optimisation de titres YouTube pour la chaîne française "La Poire Fendue" (vulgarisation scientifique pop culture, 153 921 abonnés).

Données réelles de performance CTR 24h :
- "Pourquoi [POUVOIR] serait le PIRE en vrai ?" → CTR 6–10%, meilleure formule
- "[POUVOIR] en VRAI, ça fait QUOI ?" → CTR 7.3–10.7%, Flash 10.7% (record absolu)
- "L'ENTRAÎNEMENT de [PERSO] en vrai" → CTR 7.7–8.8%
- "Devenir [PERSO] en vrai, ça coûte COMBIEN ?" → CTR 4.8–5.2%
- "[POUVOIR] en VRAI, c'est POSSIBLE ?" → CTR 5.2–7.2%
- Les titres avec CAPS, "en VRAI", questions rhétoriques surperforment
- CTR moyen chaîne : 4,52% | RPM moyen : 1,30€ | 153 921 abonnés

Le créateur propose ce titre : "${idee?.titrePropose}"
Sujet de la vidéo : "${idee?.sujet||'non précisé'}"

Évalue ce titre proposé et réponds UNIQUEMENT en JSON valide (sans markdown ni backticks) :
{
  "note": <nombre entre 0 et 10, avec décimales ex: 7.5>,
  "verdict": "<Excellent|Très bien|Bien|Passable|À retravailler>",
  "points_forts": ["<point fort 1>","<point fort 2>"],
  "points_faibles": ["<point faible 1>","<point faible 2>"],
  "feedback": "<analyse détaillée en 3-4 phrases : pourquoi ce titre fonctionne ou pas, comparaison avec tes meilleures vidéos>",
  "conseils": ["<conseil concret 1>","<conseil concret 2>","<conseil concret 3>"],
  "alternatives": [
    {"titre":"<variante améliorée 1>","ctr_pred":"<ex: 7–9%>","amelioration":"<ce qui change par rapport au titre original>"},
    {"titre":"<variante améliorée 2>","ctr_pred":"<ex: 6–8%>","amelioration":"<ce qui change>"}
  ]
}`;

    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      if(data.error){const msg=data.error.message||'';const isLimit=msg.toLowerCase().includes('length')||msg.toLowerCase().includes('limit')||data.error.type==='invalid_request_error';throw new Error(isLimit?'LIMIT':msg);}
      const text=data.content?.map(b=>b.text||'').join('')||'{}';
      const parsed=JSON.parse(text.replace(/```json|```/g,'').trim());
      const statut=parsed.note>=8?'validé':parsed.note>=6?'évalué':'revu';
      setIdees(prev=>prev.map(i=>i.id===id?{...i,statut,note:parsed.note,verdict:parsed.verdict,points_forts:parsed.points_forts||[],points_faibles:parsed.points_faibles||[],feedback:parsed.feedback,conseils:parsed.conseils||[],alternatives:parsed.alternatives||[]}:i));
      setView(id);
    }catch(e){const isLimit=e.message==='LIMIT';setIdees(prev=>prev.map(i=>i.id===id?{...i,feedback:isLimit?'⚠️ Prompt trop long. Raccourcis le titre ou le sujet et réessaie.':'Erreur — réessaie.'}:i));}
    setLoading(null);
  };

  const choisirAlternative=(id,alt)=>setIdees(prev=>prev.map(i=>i.id===id?{...i,titrePropose:alt.titre,statut:'brut',note:null,feedback:'',conseils:[],alternatives:[],points_forts:[],points_faibles:[]}:i));
  const valider=(id)=>setIdees(prev=>prev.map(i=>i.id===id?{...i,statut:'validé'}:i));
  const del=(id)=>setIdees(prev=>prev.filter(i=>i.id!==id));

  const noteColor=(n)=>n>=8?'#15803d':n>=6?'#d97706':'#dc2626';
  const noteBg=(n)=>n>=8?'#dcfce7':n>=6?'#fef3c7':'#fee2e2';

  return(
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
        <div style={{fontSize:16,fontWeight:600,color:'#111827'}}>Workshop — Titres</div>
        {idees.length>0&&<button onClick={()=>setIdees([])} style={{fontSize:11,padding:'4px 10px',borderRadius:7,border:'1px solid #fca5a5',background:'#fee2e2',color:'#dc2626',cursor:'pointer'}}>🗑️ Vider la liste</button>}
      </div>
      <div style={{fontSize:13,color:'#6b7280',marginBottom:14}}>Propose ton titre → reçois une note, un feedback détaillé et des suggestions d'amélioration.</div>

      {/* Formulaire */}
      <Card>
        <div style={{fontSize:13,fontWeight:500,color:'#111827',marginBottom:10}}>Soumettre un titre</div>
        <div style={{marginBottom:8}}>
          <label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:4}}>Sujet de la vidéo (optionnel)</label>
          <Input value={sujet} onChange={setSujet} placeholder="Ex: Gear 5 en vrai, Pilote F1, Sukuna domaine…"/>
        </div>
        <div style={{marginBottom:10}}>
          <label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:4}}>Ton titre proposé <span style={{color:'#dc2626'}}>*</span></label>
          <input value={titre} onChange={e=>setTitre(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()}
            placeholder="Ex: Pourquoi GEAR 5 serait le PIRE pouvoir à avoir en vrai ?"
            style={{width:'100%',padding:'10px 14px',borderRadius:8,border:'2px solid #7c3aed',fontSize:13,fontFamily:'system-ui',outline:'none',boxSizing:'border-box'}}/>
        </div>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <Btn label="Soumettre pour évaluation →" primary onClick={add}/>
        </div>
      </Card>

      {/* Validés */}
      {idees.filter(i=>i.statut==='validé').length>0&&(
        <div style={{marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:600,color:'#15803d',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>🏆 Titres validés</div>
          {idees.filter(i=>i.statut==='validé').map(i=>(
            <div key={i.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:8,marginBottom:6}}>
              <div style={{flex:1,fontSize:13,fontWeight:600,color:'#15803d'}}>{i.titrePropose}</div>
              {i.note&&<span style={{fontSize:14,fontWeight:700,color:'#15803d'}}>{i.note}/10</span>}
              <button onClick={()=>del(i.id)} style={{fontSize:10,padding:'2px 8px',borderRadius:6,border:'none',background:'none',color:'#9ca3af',cursor:'pointer'}}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Liste des titres soumis */}
      {idees.filter(i=>i.statut!=='validé').map(idee=>(
        <div key={idee.id} style={{border:'1px solid #e5e7eb',borderRadius:10,marginBottom:10,overflow:'hidden'}}>
          {/* Header */}
          <div style={{display:'flex',alignItems:'flex-start',gap:10,padding:'12px 14px',background:'#fafafa'}}>
            <div style={{flex:1,minWidth:0}}>
              {idee.sujet&&<div style={{fontSize:11,color:'#9ca3af',marginBottom:3}}>Sujet : {idee.sujet}</div>}
              <div style={{fontSize:13,fontWeight:600,color:'#111827',lineHeight:1.4,marginBottom:6}}>"{idee.titrePropose}"</div>
              <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,padding:'1px 7px',borderRadius:10,background:(STATUT[idee.statut]||STATUT.brut).bg,color:(STATUT[idee.statut]||STATUT.brut).tc,fontWeight:500}}>{(STATUT[idee.statut]||STATUT.brut).label}</span>
                {idee.note!==null&&(
                  <span style={{fontSize:14,fontWeight:700,color:noteColor(idee.note),background:noteBg(idee.note),padding:'1px 10px',borderRadius:10}}>{idee.note}/10 — {idee.verdict}</span>
                )}
              </div>
            </div>
            <div style={{display:'flex',gap:5,flexShrink:0}}>
              {idee.note===null?(
                <button onClick={()=>evaluer(idee.id)} disabled={loading===idee.id}
                  style={{fontSize:11,padding:'5px 12px',borderRadius:7,border:'1px solid #7c3aed',background:'#ede9fe',color:'#5b21b6',cursor:loading===idee.id?'not-allowed':'pointer',fontWeight:500,opacity:loading===idee.id?.6:1}}>
                  {loading===idee.id?'⏳ Évaluation…':'⭐ Évaluer'}
                </button>
              ):(
                <>
                  <button onClick={()=>setView(view===idee.id?null:idee.id)}
                    style={{fontSize:11,padding:'5px 12px',borderRadius:7,border:'1px solid #d1d5db',background:'none',color:'#6b7280',cursor:'pointer'}}>
                    {view===idee.id?'▲ Fermer':'▼ Détails'}
                  </button>
                  {idee.statut!=='validé'&&idee.note>=7&&(
                    <button onClick={()=>valider(idee.id)} style={{fontSize:11,padding:'5px 10px',borderRadius:7,border:'1px solid #16a34a',background:'#dcfce7',color:'#15803d',cursor:'pointer',fontWeight:500}}>🏆</button>
                  )}
                </>
              )}
              <button onClick={()=>del(idee.id)} style={{fontSize:11,padding:'5px 8px',borderRadius:7,border:'1px solid #fca5a5',background:'#fee2e2',color:'#dc2626',cursor:'pointer'}}>✕</button>
            </div>
          </div>

          {/* Détails */}
          {view===idee.id&&idee.note!==null&&(
            <div style={{padding:'14px 16px',borderTop:'1px solid #f3f4f6'}}>
              {/* Feedback */}
              <div style={{fontSize:12,color:'#374151',background:'#f9fafb',borderRadius:8,padding:'10px 12px',borderLeft:'3px solid #7c3aed',marginBottom:14,lineHeight:1.7}}>{idee.feedback}</div>

              {/* Points forts / faibles */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
                <div style={{background:'#f0fdf4',borderRadius:8,padding:'10px 12px'}}>
                  <div style={{fontSize:11,fontWeight:600,color:'#15803d',marginBottom:6}}>✅ Points forts</div>
                  {(idee.points_forts||[]).map((p,i)=><div key={i} style={{fontSize:12,color:'#15803d',padding:'2px 0'}}>• {p}</div>)}
                </div>
                <div style={{background:'#fef9f0',borderRadius:8,padding:'10px 12px'}}>
                  <div style={{fontSize:11,fontWeight:600,color:'#d97706',marginBottom:6}}>⚠️ Points à améliorer</div>
                  {(idee.points_faibles||[]).map((p,i)=><div key={i} style={{fontSize:12,color:'#92400e',padding:'2px 0'}}>• {p}</div>)}
                </div>
              </div>

              {/* Conseils */}
              {idee.conseils?.length>0&&(
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:600,color:'#6b7280',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>💡 Conseils concrets</div>
                  {idee.conseils.map((c,i)=>(
                    <div key={i} style={{fontSize:12,color:'#374151',padding:'6px 10px',background:'#f9fafb',borderRadius:6,marginBottom:4,borderLeft:'2px solid #fde68a'}}>→ {c}</div>
                  ))}
                </div>
              )}

              {/* Alternatives */}
              {idee.alternatives?.length>0&&(
                <div>
                  <div style={{fontSize:11,fontWeight:600,color:'#6b7280',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>🔄 Variantes suggérées</div>
                  {idee.alternatives.map((alt,i)=>(
                    <div key={i} style={{border:'1px solid #e5e7eb',borderRadius:8,padding:'10px 12px',marginBottom:8,background:'#fff'}}>
                      <div style={{display:'flex',justifyContent:'space-between',gap:8,marginBottom:4}}>
                        <div style={{fontSize:13,fontWeight:600,color:'#111827',flex:1,lineHeight:1.4}}>"{alt.titre}"</div>
                        <span style={{fontSize:12,fontWeight:700,color:'#16a34a',flexShrink:0}}>{alt.ctr_pred}</span>
                      </div>
                      <div style={{fontSize:11,color:'#6b7280',marginBottom:8}}>↳ {alt.amelioration}</div>
                      <button onClick={()=>choisirAlternative(idee.id,alt)}
                        style={{fontSize:11,padding:'4px 12px',borderRadius:6,border:'1px solid #7c3aed',background:'#ede9fe',color:'#5b21b6',cursor:'pointer',fontWeight:500}}>
                        Utiliser cette variante → réévaluer
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{display:'flex',gap:8,marginTop:12}}>
                <button onClick={()=>evaluer(idee.id)} disabled={loading===idee.id}
                  style={{fontSize:11,padding:'5px 12px',borderRadius:7,border:'1px solid #d1d5db',background:'none',color:'#6b7280',cursor:'pointer'}}>
                  🔄 Réévaluer
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── WORKSHOP MINIATURES ───────────────────────────────────────────────────────
function WorkshopMiniatures(){
  const [tab,setTab]=useState('analyse'); // 'analyse' | 'concurrents'
  const [idees,setIdees]=useState([]);
  const [loading,setLoading]=useState(null);
  const [view,setView]=useState(null);
  const [dragOver,setDragOver]=useState(false);
  const fileRef=useRef(null);

  // Onglet concurrents
  const [sujetConcurrent,setSujetConcurrent]=useState('');
  const [loadingConcurrents,setLoadingConcurrents]=useState(false);
  const [concurrents,setConcurrents]=useState([]);

  const STATUT={
    'brut':{label:'💬 À évaluer',bg:'#f3f4f6',tc:'#6b7280'},
    'évalué':{label:'✅ Évalué',bg:'#dbeafe',tc:'#1d4ed8'},
    'validé':{label:'🏆 Validé',bg:'#dcfce7',tc:'#15803d'},
    'revu':{label:'🔄 À retravailler',bg:'#fef3c7',tc:'#92400e'},
  };

  const loadImage=async(file)=>{
    if(!file)return;
    const allowed=['image/jpeg','image/png','image/webp'];
    if(!allowed.includes(file.type)){alert('Format non supporté. Utilise JPG, PNG ou WEBP.');return;}
    const id=Date.now();
    // Lecture directe en base64 via FileReader
    const reader=new FileReader();
    reader.onload=(e)=>{
      const dataUrl=e.target.result;
      const base64=dataUrl.split(',')[1];
      const preview=dataUrl; // utilise le dataUrl directement comme preview
      setIdees(prev=>[{id,nom:file.name,base64,preview,mediaType:file.type,statut:'brut',note:null,feedback:'',points_forts:[],points_faibles:[],conseils:[],ameliorations:[]},...prev]);
    };
    reader.onerror=()=>{
      alert('Erreur de lecture du fichier. Réessaie.');
    };
    reader.readAsDataURL(file);
  };

  const onFileInput=(e)=>{loadImage(e.target.files?.[0]);e.target.value='';};
  const onDrop=(e)=>{e.preventDefault();setDragOver(false);loadImage(e.dataTransfer.files?.[0]);};

  const evaluer=async(id)=>{
    setLoading(id);
    const idee=idees.find(i=>i.id===id);
    const prompt=`Tu es un expert en miniatures YouTube pour la chaîne "La Poire Fendue" (153 921 abonnés, vulgarisation scientifique pop culture FR).

Données réelles de performance CTR 24h de la chaîne :
- RECORD : Flash 10.7% → fond très sombre, visage choqué face caméra, personnage iconique en arrière, texte max 4 mots, éclairs visuels
- "Visage choqué + perso iconique" → CTR 7.3–10.7% (Wolverine, Homelander, Flash, Rock Lee, Baki)
- "TEXTE CAPS + fond dramatique" → CTR 8–8.4%
- "Prix géant visible" → CTR 4.8–5.2%
- Règles clés qui font la différence : fond TRÈS sombre (#0a0a0a), expression extrême (choc/dégoût/peur), MAX 4 mots lisibles en petit, personnage ultra-reconnaissable, contraste fort texte/fond, visage à gauche + perso à droite
- CTR moyen chaîne : 4,52%

Analyse cette miniature soumise par le créateur. Donne un feedback honnête, précis et actionnable.

Réponds UNIQUEMENT en JSON valide (sans markdown ni backticks) :
{
  "note": <nombre 0-10 avec décimale>,
  "verdict": "<Excellent|Très bien|Bien|Passable|À retravailler>",
  "ctr_estime": "<ex: 7–9%>",
  "impression_generale": "<1 phrase résumant l'impression immédiate>",
  "points_forts": ["<point fort 1>","<point fort 2>"],
  "points_faibles": ["<point faible 1>","<point faible 2>","<point faible 3>"],
  "feedback": "<analyse détaillée 4-5 phrases : fond, expression, lisibilité, personnage, comparaison avec Flash 10.7%>",
  "conseils": [
    "<modification concrète et précise 1>",
    "<modification concrète et précise 2>",
    "<modification concrète et précise 3>"
  ],
  "ameliorations": [
    {"description": "<description du concept amélioré>", "ctr_pred": "<CTR prédit>", "raison": "<pourquoi mieux>"}
  ]
}`;

    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:1000,
        messages:[{role:"user",content:[
          {type:"image",source:{type:"base64",media_type:idee.mediaType,data:idee.base64}},
          {type:"text",text:prompt}
        ]}]
      })});
      const data=await res.json();
      if(data.error){const isLimit=data.error.type==='invalid_request_error'||(data.error.message||'').toLowerCase().includes('length');setIdees(prev=>prev.map(i=>i.id===id?{...i,feedback:isLimit?'⚠️ Image trop lourde ou prompt trop long. Essaie avec une image plus légère (JPG compressé).':'Erreur — réessaie.'}:i));setLoading(null);return;}
      const text=data.content?.map(b=>b.text||'').join('')||'{}';
      const parsed=JSON.parse(text.replace(/```json|```/g,'').trim());
      const statut=parsed.note>=8?'validé':parsed.note>=6?'évalué':'revu';
      setIdees(prev=>prev.map(i=>i.id===id?{...i,statut,...parsed}:i));
      setView(id);
    }catch(e){setIdees(prev=>prev.map(i=>i.id===id?{...i,feedback:'Erreur de connexion — réessaie.'}:i));}
    setLoading(null);
  };

  const valider=(id)=>setIdees(prev=>prev.map(i=>i.id===id?{...i,statut:'validé'}:i));
  const del=(id)=>{
    const idee=idees.find(i=>i.id===id);
    if(idee?.preview)URL.revokeObjectURL(idee.preview);
    setIdees(prev=>prev.filter(i=>i.id!==id));
  };

  const noteColor=(n)=>n>=8?'#15803d':n>=6?'#d97706':'#dc2626';
  const noteBg=(n)=>n>=8?'#dcfce7':n>=6?'#fef3c7':'#fee2e2';

  // Recherche concurrents
  const rechercherConcurrents=async()=>{
    if(!sujetConcurrent.trim())return;
    setLoadingConcurrents(true);setConcurrents([]);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:1000,
        messages:[{role:"user",content:`Analyse 4 miniatures YouTube performantes sur le sujet "${sujetConcurrent}" pour des chaînes pop culture / anime FR.
Reponds en JSON valide uniquement, sans markdown :
{"sujet":"${sujetConcurrent}","miniatures":[{"chaine":"nom","titre":"titre court","fond":"noir","texte":"MOT1 MOT2","ctr":"7-9%","pourquoi":"1 phrase","lecon":"1 lecon"},{"chaine":"nom","titre":"titre","fond":"rouge","texte":"MOT","ctr":"6-8%","pourquoi":"phrase","lecon":"lecon"},{"chaine":"nom","titre":"titre","fond":"bleu","texte":"MOT","ctr":"7-8%","pourquoi":"phrase","lecon":"lecon"},{"chaine":"nom","titre":"titre","fond":"sombre","texte":"MOT","ctr":"5-7%","pourquoi":"phrase","lecon":"lecon"}],"synthese":"2 phrases max","conseil":"conseil pour La Poire Fendue"}`}]
      })});
      const data=await res.json();
      if(data.error){setConcurrents({error:true,msg:data.error.message});return;}
      const raw=data.content?.map(b=>b.text||'').join('')||'{}';
      const match=raw.match(/\{[\s\S]*\}/);
      if(!match){setConcurrents({error:true,msg:'Réponse invalide'});return;}
      setConcurrents(JSON.parse(match[0]));
    }catch(e){setConcurrents({error:true,msg:e.message});}
    setLoadingConcurrents(false);
  };

  const fondColor=(fond='')=>{
    const f=fond.toLowerCase();
    if(f.includes('rouge')||f.includes('red'))return'#150303';
    if(f.includes('bleu')||f.includes('blue'))return'#020b18';
    if(f.includes('vert')||f.includes('green'))return'#021008';
    if(f.includes('violet')||f.includes('purple'))return'#080212';
    if(f.includes('orange'))return'#140600';
    return'#050505';
  };

  return(
    <div>
      <div style={{fontSize:16,fontWeight:600,color:'#111827',marginBottom:4}}>Workshop — Miniatures</div>
      <div style={{fontSize:13,color:'#6b7280',marginBottom:12}}>Analyse ta miniature par image · Inspire-toi des concurrents.</div>

      {/* Tabs */}
      <div style={{display:'flex',gap:0,marginBottom:16,border:'1px solid #e5e7eb',borderRadius:8,overflow:'hidden'}}>
        {[['analyse','📸 Analyser ma miniature'],['concurrents','🔍 Miniatures concurrentes']].map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:'9px',fontSize:12,fontWeight:tab===t?600:400,background:tab===t?'#7c3aed':'#fff',color:tab===t?'#fff':'#6b7280',border:'none',cursor:'pointer',transition:'all .15s'}}>
            {l}
          </button>
        ))}
      </div>

      {/* ── ONGLET ANALYSE ── */}
      {tab==='analyse'&&(
        <div>
          <div style={{background:'#ede9fe',border:'1px solid #c4b5fd',borderRadius:8,padding:'10px 14px',fontSize:12,color:'#5b21b6',marginBottom:14}}>
            🏆 <b>Référence :</b> Flash 10.7% CTR — fond #0a0a0a · visage choqué · perso iconique · max 4 mots · contraste maximal
          </div>

          {/* Zone upload */}
          <div
            onClick={()=>fileRef.current?.click()}
            onDrop={onDrop}
            onDragOver={e=>{e.preventDefault();setDragOver(true);}}
            onDragLeave={()=>setDragOver(false)}
            style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,padding:'24px',marginBottom:16,borderRadius:10,border:`2px dashed ${dragOver?'#7c3aed':'#d1d5db'}`,background:dragOver?'#ede9fe':'#f9fafb',cursor:'pointer',transition:'all .15s'}}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dragOver?'#7c3aed':'#9ca3af'} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <div style={{fontSize:13,fontWeight:500,color:dragOver?'#7c3aed':'#6b7280'}}>Glisse ou clique pour uploader ta miniature</div>
            <div style={{fontSize:11,color:'#9ca3af'}}>JPG · PNG · WEBP</div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{display:'none'}} onChange={onFileInput}/>
          </div>

          {/* Validées */}
          {idees.filter(i=>i.statut==='validé').length>0&&(
            <div style={{marginBottom:12}}>
              <div style={{fontSize:12,fontWeight:600,color:'#15803d',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>🏆 Miniatures validées</div>
              {idees.filter(i=>i.statut==='validé').map(i=>(
                <div key={i.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:8,marginBottom:6}}>
                  {i.preview&&<img src={i.preview} alt="" style={{width:64,height:36,objectFit:'cover',borderRadius:4,flexShrink:0}}/>}
                  <div style={{flex:1,fontSize:12,fontWeight:600,color:'#15803d'}}>{i.nom}</div>
                  {i.note&&<span style={{fontSize:14,fontWeight:700,color:'#15803d'}}>{i.note}/10</span>}
                  <button onClick={()=>del(i.id)} style={{fontSize:10,padding:'2px 8px',borderRadius:6,border:'none',background:'none',color:'#9ca3af',cursor:'pointer'}}>✕</button>
                </div>
              ))}
            </div>
          )}

          {idees.filter(i=>i.statut!=='validé').length===0&&(
            <div style={{textAlign:'center',padding:'24px',color:'#9ca3af',fontSize:13,border:'1px dashed #e5e7eb',borderRadius:10}}>
              Aucune miniature soumise. Upload une image ci-dessus.
            </div>
          )}

          {/* Liste miniatures */}
          {idees.filter(i=>i.statut!=='validé').map(idee=>(
            <div key={idee.id} style={{border:'1px solid #e5e7eb',borderRadius:10,marginBottom:10,overflow:'hidden'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',background:'#fafafa'}}>
                {idee.preview&&<img src={idee.preview} alt="miniature" style={{width:80,height:45,objectFit:'cover',borderRadius:6,flexShrink:0,border:'1px solid #e5e7eb',background:'#f3f4f6'}}/>}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:500,color:'#111827',marginBottom:4,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{idee.nom}</div>
                  <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                    <span style={{fontSize:11,padding:'1px 7px',borderRadius:10,background:(STATUT[idee.statut]||STATUT.brut).bg,color:(STATUT[idee.statut]||STATUT.brut).tc,fontWeight:500}}>{(STATUT[idee.statut]||STATUT.brut).label}</span>
                    {!idee.base64&&idee.note===null&&!idee.feedback&&<span style={{fontSize:11,color:'#9ca3af'}}>⏳ Chargement…</span>}
                    {idee.note!==null&&(
                      <>
                        <span style={{fontSize:14,fontWeight:700,color:noteColor(idee.note),background:noteBg(idee.note),padding:'1px 10px',borderRadius:10}}>{idee.note}/10 — {idee.verdict}</span>
                        {idee.ctr_estime&&<span style={{fontSize:11,color:'#16a34a',fontWeight:600}}>CTR ~{idee.ctr_estime}</span>}
                      </>
                    )}
                    {idee.note===null&&idee.feedback&&<span style={{fontSize:11,color:'#dc2626'}}>{idee.feedback}</span>}
                  </div>
                </div>
                <div style={{display:'flex',gap:5,flexShrink:0}}>
                  {idee.note===null&&idee.base64?(
                    <button onClick={()=>evaluer(idee.id)} disabled={loading===idee.id}
                      style={{fontSize:11,padding:'5px 12px',borderRadius:7,border:'1px solid #7c3aed',background:'#ede9fe',color:'#5b21b6',cursor:loading===idee.id?'not-allowed':'pointer',fontWeight:500,opacity:loading===idee.id?.6:1}}>
                      {loading===idee.id?'⏳ Analyse…':'⭐ Analyser'}
                    </button>
                  ):idee.note===null&&!idee.base64&&!idee.feedback?(
                    <button disabled style={{fontSize:11,padding:'5px 12px',borderRadius:7,border:'1px solid #d1d5db',background:'#f3f4f6',color:'#9ca3af',cursor:'not-allowed'}}>⏳ Chargement…</button>
                  ):(
                    <>
                      <button onClick={()=>setView(view===idee.id?null:idee.id)}
                        style={{fontSize:11,padding:'5px 12px',borderRadius:7,border:'1px solid #d1d5db',background:'none',color:'#6b7280',cursor:'pointer'}}>
                        {view===idee.id?'▲ Fermer':'▼ Détails'}
                      </button>
                      {idee.note>=7&&<button onClick={()=>valider(idee.id)} style={{fontSize:11,padding:'5px 10px',borderRadius:7,border:'1px solid #16a34a',background:'#dcfce7',color:'#15803d',cursor:'pointer'}}>🏆</button>}
                    </>
                  )}
                  <button onClick={()=>del(idee.id)} style={{fontSize:11,padding:'5px 8px',borderRadius:7,border:'1px solid #fca5a5',background:'#fee2e2',color:'#dc2626',cursor:'pointer'}}>✕</button>
                </div>
              </div>

              {view===idee.id&&idee.note!==null&&(
                <div style={{padding:'14px 16px',borderTop:'1px solid #f3f4f6'}}>
                  {/* Aperçu + impression */}
                  <div style={{display:'flex',gap:12,marginBottom:14,alignItems:'flex-start'}}>
                    {idee.preview&&<img src={idee.preview} alt="" style={{width:160,height:90,objectFit:'cover',borderRadius:8,flexShrink:0,border:'1px solid #e5e7eb'}}/>}                    <div style={{flex:1}}>
                      {idee.impression_generale&&<div style={{fontSize:13,fontWeight:500,color:'#111827',marginBottom:8,lineHeight:1.5}}>"{idee.impression_generale}"</div>}
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                        <div style={{background:'#f0fdf4',borderRadius:8,padding:'8px 10px'}}>
                          <div style={{fontSize:10,fontWeight:600,color:'#15803d',marginBottom:4}}>✅ POINTS FORTS</div>
                          {(idee.points_forts||[]).map((p,i)=><div key={i} style={{fontSize:11,color:'#15803d',padding:'1px 0'}}>• {p}</div>)}
                        </div>
                        <div style={{background:'#fef9f0',borderRadius:8,padding:'8px 10px'}}>
                          <div style={{fontSize:10,fontWeight:600,color:'#d97706',marginBottom:4}}>⚠️ À AMÉLIORER</div>
                          {(idee.points_faibles||[]).map((p,i)=><div key={i} style={{fontSize:11,color:'#92400e',padding:'1px 0'}}>• {p}</div>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div style={{fontSize:12,color:'#374151',background:'#f9fafb',borderRadius:8,padding:'10px 12px',borderLeft:'3px solid #7c3aed',marginBottom:14,lineHeight:1.7}}>{idee.feedback}</div>

                  {/* Conseils */}
                  {idee.conseils?.length>0&&(
                    <div style={{marginBottom:14}}>
                      <div style={{fontSize:11,fontWeight:600,color:'#6b7280',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>💡 Modifications concrètes</div>
                      {idee.conseils.map((c,i)=>(
                        <div key={i} style={{fontSize:12,color:'#374151',padding:'7px 10px',background:'#f9fafb',borderRadius:6,marginBottom:4,borderLeft:'2px solid #fde68a',lineHeight:1.5}}>→ {c}</div>
                      ))}
                    </div>
                  )}

                  {/* Version améliorée */}
                  {idee.ameliorations?.length>0&&(
                    <div>
                      <div style={{fontSize:11,fontWeight:600,color:'#6b7280',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>🔄 Version améliorée suggérée</div>
                      {idee.ameliorations.map((a,i)=>(
                        <div key={i} style={{border:'1px solid #c4b5fd',borderRadius:8,padding:'10px 12px',background:'#faf8ff'}}>
                          <div style={{fontSize:12,fontWeight:500,color:'#111827',lineHeight:1.5,marginBottom:6}}>{a.description}</div>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{fontSize:11,color:'#6b7280',flex:1}}>↳ {a.raison}</div>
                            <span style={{fontSize:13,fontWeight:700,color:'#16a34a',marginLeft:8}}>{a.ctr_pred}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button onClick={()=>evaluer(idee.id)} disabled={loading===idee.id} style={{fontSize:11,padding:'5px 12px',borderRadius:7,border:'1px solid #d1d5db',background:'none',color:'#6b7280',cursor:'pointer',marginTop:12}}>🔄 Réévaluer</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── ONGLET CONCURRENTS ── */}
      {tab==='concurrents'&&(
        <div>
          <div style={{fontSize:13,color:'#6b7280',marginBottom:12}}>Entre un sujet → je t'analyse les miniatures qui performent le mieux sur des chaînes similaires.</div>
          <Card>
            <div style={{display:'flex',gap:8}}>
              <input value={sujetConcurrent} onChange={e=>setSujetConcurrent(e.target.value)} onKeyDown={e=>e.key==='Enter'&&rechercherConcurrents()}
                placeholder="Ex: Gear 5 One Piece · Pilote F1 · Domaine d'expansion JJK…"
                style={{flex:1,padding:'10px 14px',borderRadius:8,border:'2px solid #7c3aed',fontSize:13,fontFamily:'system-ui',outline:'none',boxSizing:'border-box'}}/>
              <Btn label={loadingConcurrents?'⏳ Recherche…':'🔍 Analyser'} primary onClick={rechercherConcurrents} disabled={loadingConcurrents}/>
            </div>
          </Card>

          {loadingConcurrents&&(
            <div style={{textAlign:'center',padding:32,color:'#7c3aed'}}>
              <div style={{fontSize:20,marginBottom:8}}>🔍</div>
              <div style={{fontSize:13,fontWeight:500}}>Analyse des miniatures concurrentes en cours…</div>
            </div>
          )}

          {concurrents.error&&<div style={{textAlign:'center',padding:20,color:'#dc2626',fontSize:13}}>Erreur — {concurrents.msg||'réessaie.'}</div>}

          {concurrents.miniatures&&(
            <div>
              {/* Synthèse */}
              <div style={{background:'#ede9fe',border:'1px solid #c4b5fd',borderRadius:10,padding:'12px 16px',marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:600,color:'#5b21b6',marginBottom:6}}>📊 Synthèse — "{concurrents.sujet}"</div>
                <div style={{fontSize:12,color:'#5b21b6',lineHeight:1.6,marginBottom:8}}>{concurrents.synthese}</div>
                <div style={{fontSize:12,color:'#374151',background:'#fff',borderRadius:6,padding:'8px 10px',borderLeft:'3px solid #7c3aed'}}>
                  🎯 <b>Pour La Poire Fendue :</b> {concurrents.conseil_lpf}
                </div>
              </div>

              {/* Miniatures */}
              <div style={{fontSize:12,fontWeight:600,color:'#6b7280',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:10}}>5 miniatures qui performent sur ce sujet</div>
              {concurrents.miniatures.map((m,i)=>(
                <div key={i} style={{border:'1px solid #e5e7eb',borderRadius:10,marginBottom:10,overflow:'hidden'}}>
                  <div style={{display:'flex',gap:12,padding:'12px 14px',alignItems:'flex-start'}}>
                    {/* Aperçu simulé */}
                    <div style={{width:100,height:56,borderRadius:6,background:fondColor(m.fond),display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,padding:6,position:'relative'}}>
                      <div style={{fontSize:10,fontWeight:800,color:'#fff',textAlign:'center',lineHeight:1.1,textTransform:'uppercase',textShadow:'0 1px 4px rgba(0,0,0,0.9)'}}>{m.texte}</div>
                      <div style={{position:'absolute',bottom:3,right:4,fontSize:8,color:'rgba(255,255,255,0.5)',fontWeight:600}}>{m.ctr_estime}</div>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:4}}>
                        <div>
                          <div style={{fontSize:12,fontWeight:600,color:'#7c3aed'}}>{m.chaine}</div>
                          <div style={{fontSize:11,color:'#9ca3af',marginBottom:4}}>{m.titre_video}</div>
                        </div>
                        <span style={{fontSize:13,fontWeight:700,color:'#16a34a',flexShrink:0}}>{m.ctr_estime}</span>
                      </div>
                      <div style={{fontSize:11,color:'#374151',marginBottom:6,lineHeight:1.5}}><b>Visuel :</b> {m.description_visuelle}</div>
                      <div style={{fontSize:11,color:'#6b7280',marginBottom:6,lineHeight:1.5}}>{m.pourquoi_ca_marche}</div>
                      <div style={{fontSize:11,color:'#5b21b6',background:'#ede9fe',padding:'4px 8px',borderRadius:6,display:'inline-block'}}>💡 {m.lecon}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!concurrents.miniatures&&!loadingConcurrents&&!concurrents.error&&(
            <div style={{textAlign:'center',padding:32,color:'#9ca3af',fontSize:13,border:'1px dashed #e5e7eb',borderRadius:10}}>
              Entre un sujet pour voir les miniatures concurrentes qui performent.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── CALENDRIER ────────────────────────────────────────────────────────────────
function Calendrier(){
  const [videos,setVideos]=useState([
    {id:1,titre:'Pourquoi LUFFY GEAR 5 serait le PIRE pouvoir en vrai ?',pubDate:'2026-05-03',statut:'en-cours',etapeActuelle:2,score:97,cat:'anime',notes:''},
    {id:2,titre:"L'ENTRAÎNEMENT d'un PILOTE F1 en vrai, c'est POSSIBLE ?",pubDate:'2026-05-17',statut:'planifié',etapeActuelle:0,score:95,cat:'f1',notes:'GP Monaco 7 juin — sortir avant'},
    {id:3,titre:'COMBIEN de CALORIES pour faire un KAMEHAMEHA en vrai ?',pubDate:'2026-05-31',statut:'planifié',etapeActuelle:0,score:88,cat:'format',notes:'Lancement série calories'},
  ]);
  const [modal,setModal]=useState(null);
  const [editTarget,setEditTarget]=useState(null);
  const [form,setForm]=useState({titre:'',pubDate:'',cat:'anime',notes:''});

  const STATUT_COLOR={
    'publié':{bg:'#dcfce7',tc:'#15803d',label:'✅ Publié'},
    'en-cours':{bg:'#dbeafe',tc:'#1d4ed8',label:'🔵 En cours'},
    'planifié':{bg:'#fef3c7',tc:'#92400e',label:'🟡 Planifié'},
    'bloqué':{bg:'#fee2e2',tc:'#dc2626',label:'🔴 Bloqué'},
  };
  const CAT_COLOR={anime:'#ede9fe',marvel:'#fee2e2',f1:'#ccfbf1',format:'#dcfce7',custom:'#f3f4f6'};

  const getDeadlines=(pubDate)=>{
    const steps=[];let cur=pubDate;
    for(let i=ETAPES.length-2;i>=0;i--){cur=addDays(cur,-ETAPE_DUREE[i]);steps.unshift({etape:ETAPES[i],date:cur});}
    steps.push({etape:'Publication',date:pubDate});
    return steps;
  };

  const openAdd=()=>{
    const occupes=videos.map(v=>v.pubDate);
    const libre=prochainsDimanches(12).find(d=>!occupes.includes(d))||prochainsDimanches(12)[0];
    setForm({titre:'',pubDate:libre,cat:'anime',notes:''});setModal('add');
  };
  const openEdit=(v)=>{setEditTarget(v.id);setForm({titre:v.titre,pubDate:v.pubDate,cat:v.cat,notes:v.notes});setModal('edit');};
  const saveAdd=()=>{if(!form.titre.trim()||!form.pubDate)return;setVideos(prev=>[...prev,{id:Date.now(),titre:form.titre,pubDate:form.pubDate,statut:'planifié',etapeActuelle:0,score:80,cat:form.cat,notes:form.notes}]);setModal(null);};
  const saveEdit=()=>{setVideos(prev=>prev.map(v=>v.id===editTarget?{...v,...form}:v));setModal(null);};
  const del=(id)=>setVideos(prev=>prev.filter(v=>v.id!==id));
  const advanceEtape=(id)=>setVideos(prev=>prev.map(v=>v.id===id&&v.etapeActuelle<ETAPES.length-1?{...v,etapeActuelle:v.etapeActuelle+1,statut:v.etapeActuelle+1===ETAPES.length-1?'publié':'en-cours'}:v));
  const revertEtape=(id)=>setVideos(prev=>prev.map(v=>v.id===id&&v.etapeActuelle>0?{...v,etapeActuelle:v.etapeActuelle-1,statut:'en-cours'}:v));
  const addSuggestion=(s)=>{
    const occupes=videos.map(v=>v.pubDate);
    const dimanches=prochainsDimanches(16);
    const cible=new Date(s.pubCible);
    const meilleur=dimanches.reduce((best,d)=>Math.abs(new Date(d)-cible)<Math.abs(new Date(best)-cible)?d:best,dimanches[0]);
    const libre=occupes.includes(meilleur)?dimanches.find(d=>!occupes.includes(d)&&new Date(d)>=cible)||meilleur:meilleur;
    setVideos(prev=>[...prev,{id:Date.now(),titre:s.titre,pubDate:libre,statut:'planifié',etapeActuelle:0,score:s.score,cat:s.cat,notes:s.raison}]);
  };

  const prochainLibre=prochainsDimanches(12).find(d=>!videos.map(v=>v.pubDate).includes(d));

  return(
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <div style={{fontSize:16,fontWeight:600,color:'#111827'}}>Calendrier de production</div>
        <Btn label="+ Ajouter" small primary onClick={openAdd}/>
      </div>

      <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:8,padding:'8px 14px',fontSize:12,color:'#15803d',marginBottom:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span>📅 Rythme : <b>1 vidéo / 2 semaines</b> · Publication le <b>dimanche à 15h30</b></span>
        <span>Prochain créneau libre : <b>{formatDate(prochainLibre)}</b></span>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
        {[[videos.filter(v=>v.statut==='en-cours').length,'En cours','#dbeafe','#1d4ed8'],[videos.filter(v=>v.statut==='planifié').length,'Planifiées','#fef3c7','#92400e'],[videos.filter(v=>v.statut==='bloqué').length,'Bloquées','#fee2e2','#dc2626'],[videosPubliees.length,'Publiées récentes','#dcfce7','#15803d']].map(([v,l,bg,tc])=>(
          <div key={l} style={{background:bg,borderRadius:8,padding:'10px 12px',textAlign:'center'}}>
            <div style={{fontSize:20,fontWeight:700,color:tc}}>{v}</div>
            <div style={{fontSize:11,color:tc}}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{fontSize:13,fontWeight:600,color:'#111827',marginBottom:8}}>🎬 En production</div>
      {videos.filter(v=>v.statut!=='publié').sort((a,b)=>new Date(a.pubDate)-new Date(b.pubDate)).map(v=>{
        const deadlines=getDeadlines(v.pubDate);
        const jours=daysUntil(v.pubDate);
        const etapeEnCours=deadlines[v.etapeActuelle];
        const joursEtape=etapeEnCours?daysUntil(etapeEnCours.date):0;
        const sc=STATUT_COLOR[v.statut]||STATUT_COLOR['planifié'];
        return(
          <div key={v.id} style={{border:'1px solid #e5e7eb',borderRadius:10,marginBottom:12,overflow:'hidden'}}>
            <div style={{display:'flex',gap:10,padding:'12px 14px',background:'#fafafa',borderBottom:'1px solid #f3f4f6',alignItems:'flex-start'}}>
              <div style={{width:10,height:10,borderRadius:'50%',background:CAT_COLOR[v.cat]||'#f3f4f6',border:'2px solid #d1d5db',flexShrink:0,marginTop:4}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:'#111827',lineHeight:1.4}}>{v.titre}</div>
                <div style={{display:'flex',gap:8,marginTop:4,flexWrap:'wrap',alignItems:'center'}}>
                  <span style={{fontSize:11,padding:'1px 7px',borderRadius:10,background:sc.bg,color:sc.tc,fontWeight:500}}>{sc.label}</span>
                  <span style={{fontSize:11,color:jours<7?'#dc2626':jours<14?'#d97706':'#6b7280',fontWeight:jours<7?600:400}}>📅 {formatDate(v.pubDate)} à 15h30 {jours>=0?`(dans ${jours}j)`:''}</span>
                  {v.notes&&<span style={{fontSize:11,color:'#9ca3af',fontStyle:'italic'}}>{v.notes}</span>}
                </div>
              </div>
              <div style={{display:'flex',gap:5,flexShrink:0}}>
                <button onClick={()=>openEdit(v)} style={{fontSize:11,padding:'3px 8px',borderRadius:6,border:'1px solid #d1d5db',background:'none',color:'#6b7280',cursor:'pointer'}}>✏️</button>
                <button onClick={()=>del(v.id)} style={{fontSize:11,padding:'3px 8px',borderRadius:6,border:'1px solid #fca5a5',background:'#fee2e2',color:'#dc2626',cursor:'pointer'}}>🗑️</button>
              </div>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontSize:11,fontWeight:600,color:'#6b7280',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:10}}>Deadlines</div>
              <div style={{display:'flex',gap:0,position:'relative'}}>
                {deadlines.map((d,i)=>{
                  const done=i<v.etapeActuelle;
                  const current=i===v.etapeActuelle;
                  const jj=daysUntil(d.date);
                  return(
                    <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',position:'relative'}}>
                      {i<deadlines.length-1&&<div style={{position:'absolute',top:11,left:'50%',width:'100%',height:2,background:done?'#7c3aed':'#e5e7eb',zIndex:0}}/>}
                      <div
                        style={{width:22,height:22,borderRadius:'50%',background:done?'#7c3aed':current?'#fef3c7':i===deadlines.length-1?'#dcfce7':'#f3f4f6',border:`2px solid ${done?'#7c3aed':current?'#d97706':i===deadlines.length-1?'#16a34a':'#d1d5db'}`,color:done?'#fff':current?'#92400e':i===deadlines.length-1?'#15803d':'#9ca3af',fontSize:9,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',zIndex:1,position:'relative',cursor:done||current?'pointer':'default',transition:'transform .1s'}}
                        title={done?'Cliquer pour annuler':current?'Cliquer pour valider':''}
                        onClick={()=>{if(done)revertEtape(v.id);else if(current)advanceEtape(v.id);}}
                        onMouseEnter={e=>{if(done||current)e.currentTarget.style.transform='scale(1.2)';}}
                        onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';}}
                      >{done?'✓':i+1}</div>
                      <div style={{fontSize:9,color:current?'#d97706':done?'#7c3aed':'#9ca3af',marginTop:4,textAlign:'center',fontWeight:current?600:400,lineHeight:1.2}}>{d.etape}</div>
                      <div style={{fontSize:9,color:jj<0?'#dc2626':jj<3?'#d97706':'#9ca3af',textAlign:'center'}}>{formatDate(d.date)}</div>
                    </div>
                  );
                })}
              </div>
              {v.etapeActuelle<ETAPES.length-1&&(
                <div style={{marginTop:12,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                  <div style={{fontSize:12,color:'#374151'}}>
                    Étape : <b style={{color:'#1d4ed8'}}>{ETAPES[v.etapeActuelle]}</b>
                    {etapeEnCours&&<span style={{color:joursEtape<0?'#dc2626':joursEtape<3?'#d97706':'#9ca3af'}}> · deadline {formatDate(etapeEnCours.date)} ({joursEtape>=0?`${joursEtape}j`:'dépassé'})</span>}
                  </div>
                  <button onClick={()=>advanceEtape(v.id)} style={{fontSize:11,padding:'4px 12px',borderRadius:7,border:'1px solid #7c3aed',background:'#ede9fe',color:'#5b21b6',cursor:'pointer',fontWeight:500}}>✓ Étape terminée →</button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div style={{fontSize:13,fontWeight:600,color:'#111827',margin:'20px 0 8px'}}>💡 Suggestions — opportunités 2026</div>
      <div style={{fontSize:12,color:'#6b7280',marginBottom:12}}>Classées par urgence. Date suggérée = dimanche le plus stratégique.</div>
      {suggestions2026.filter(s=>!videos.find(v=>v.titre===s.titre)).sort((a,b)=>{
        const order={'🔴':0,'🟡':1,'🔵':2,'🟢':3};
        return (order[a.urgence.slice(0,2)]??4)-(order[b.urgence.slice(0,2)]??4);
      }).map((s,i)=>{
        const occupes=videos.map(v=>v.pubDate);
        const dimanches=prochainsDimanches(16);
        const cible=new Date(s.pubCible);
        const meilleur=dimanches.reduce((best,d)=>Math.abs(new Date(d)-cible)<Math.abs(new Date(best)-cible)?d:best,dimanches[0]);
        const libre=occupes.includes(meilleur)?dimanches.find(d=>!occupes.includes(d)&&new Date(d)>=cible)||meilleur:meilleur;
        const jj=daysUntil(libre);
        const urgBg=s.urgence.startsWith('🔴')?'#fee2e2':s.urgence.startsWith('🟡')?'#fef3c7':s.urgence.startsWith('🔵')?'#dbeafe':'#dcfce7';
        const urgTc=s.urgence.startsWith('🔴')?'#991b1b':s.urgence.startsWith('🟡')?'#92400e':s.urgence.startsWith('🔵')?'#1d4ed8':'#15803d';
        return(
          <div key={i} style={{border:'1px solid #e5e7eb',borderRadius:10,marginBottom:10,overflow:'hidden'}}>
            <div style={{display:'flex',gap:10,padding:'12px 14px',alignItems:'flex-start'}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:6,flexWrap:'wrap'}}>
                  <span style={{fontSize:11,padding:'2px 8px',borderRadius:10,background:urgBg,color:urgTc,fontWeight:600}}>{s.urgence}</span>
                  <span style={{fontSize:11,color:'#9ca3af'}}>Score {s.score}/100</span>
                  <span style={{fontSize:11,background:'#f3f4f6',color:'#6b7280',padding:'1px 6px',borderRadius:8}}>{s.cat}</span>
                </div>
                <div style={{fontSize:13,fontWeight:600,color:'#111827',lineHeight:1.4,marginBottom:6}}>{s.titre}</div>
                <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
                  <span style={{fontSize:12,color:'#7c3aed',fontWeight:500}}>📅 Dimanche {formatDate(libre)} à 15h30</span>
                  <span style={{fontSize:11,color:jj<14?'#dc2626':jj<30?'#d97706':'#6b7280'}}>{jj>=0?`dans ${jj} jours`:''}</span>
                </div>
                <div style={{fontSize:12,color:'#6b7280',background:'#f9fafb',borderRadius:6,padding:'7px 10px',borderLeft:'3px solid #7c3aed',lineHeight:1.5}}>💬 {s.pourquoi}</div>
              </div>
              <button onClick={()=>addSuggestion(s)} style={{fontSize:11,padding:'6px 14px',borderRadius:7,border:'1px solid #7c3aed',background:'#ede9fe',color:'#5b21b6',cursor:'pointer',fontWeight:600,flexShrink:0,marginTop:4}}>+ Planifier</button>
            </div>
          </div>
        );
      })}

      <div style={{fontSize:13,fontWeight:600,color:'#111827',margin:'20px 0 8px'}}>📋 Historique récent</div>
      <div style={{border:'1px solid #e5e7eb',borderRadius:10,overflow:'hidden'}}>
        {videosPubliees.sort((a,b)=>new Date(b.date)-new Date(a.date)).map((v,i,arr)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 14px',borderBottom:i<arr.length-1?'1px solid #f3f4f6':'none'}}>
            <span style={{fontSize:14}}>✅</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:500,color:'#111827',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{v.titre}</div>
              <div style={{fontSize:11,color:'#9ca3af'}}>{formatDate(v.date)} · {v.vues.toLocaleString('fr-FR')} vues · CTR {v.ctr}%</div>
            </div>
          </div>
        ))}
      </div>

      {/* MODALES */}
      {(modal==='add'||modal==='edit')&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setModal(null)}>
          <div style={{background:'#fff',borderRadius:12,padding:24,width:480,maxWidth:'90vw',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:15,fontWeight:600,color:'#111827',marginBottom:16}}>{modal==='add'?'Ajouter une vidéo':'Modifier la vidéo'}</div>
            <div style={{marginBottom:10}}>
              <label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:4}}>Titre</label>
              <input value={form.titre} onChange={e=>setForm(f=>({...f,titre:e.target.value}))} placeholder="Titre de la vidéo" style={{width:'100%',padding:'8px 12px',borderRadius:8,border:'1px solid #e5e7eb',fontSize:13,boxSizing:'border-box'}}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div>
                <label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:4}}>Date (dimanche)</label>
                <input type="date" value={form.pubDate} onChange={e=>setForm(f=>({...f,pubDate:e.target.value}))} style={{width:'100%',padding:'8px 10px',borderRadius:8,border:'1px solid #e5e7eb',fontSize:13,boxSizing:'border-box'}}/>
                {form.pubDate&&new Date(form.pubDate).getDay()!==0&&<div style={{color:'#dc2626',fontSize:10,marginTop:3}}>⚠️ Pas un dimanche</div>}
              </div>
              <div>
                <label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:4}}>Catégorie</label>
                <select value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))} style={{width:'100%',padding:'8px 10px',borderRadius:8,border:'1px solid #e5e7eb',fontSize:13,background:'#fff'}}>
                  {[['anime','Anime'],['marvel','Marvel/DC'],['f1','F1/Sport'],['format','Nouveau format'],['custom','Autre']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:4}}>Notes</label>
              <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} rows={2} placeholder="Ex: GP Monaco 7 juin — sortir avant" style={{width:'100%',padding:'8px 12px',borderRadius:8,border:'1px solid #e5e7eb',fontSize:13,resize:'vertical',boxSizing:'border-box'}}/>
            </div>
            {form.pubDate&&(
              <div style={{background:'#f9fafb',borderRadius:8,padding:'10px 12px',marginBottom:16,fontSize:12}}>
                <div style={{fontWeight:600,color:'#111827',marginBottom:6}}>📅 Deadlines auto — publication dimanche {form.pubDate} à 15h30</div>
                {getDeadlines(form.pubDate).map((d,i,arr)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'3px 0',borderBottom:i<arr.length-1?'1px solid #f3f4f6':'none'}}>
                    <span style={{color:i===arr.length-1?'#15803d':'#374151',fontWeight:i===arr.length-1?600:400}}>{d.etape}</span>
                    <span style={{color:'#7c3aed',fontWeight:500}}>{formatDate(d.date)}{i===arr.length-1?' · 15h30':''}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              <Btn label="Annuler" onClick={()=>setModal(null)}/>
              <Btn label={modal==='add'?'Ajouter':'Enregistrer'} primary onClick={modal==='add'?saveAdd:saveEdit}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── PIPELINE ──────────────────────────────────────────────────────────────────
function Pipeline(){
  const init=()=>{const c={};COLS.forEach(col=>c[col]=[]);ideas.slice(0,5).forEach(i=>c['Idée'].push({...i,col:'Idée'}));return c;};
  const [cols,setCols]=useState(init);
  const [newTitle,setNewTitle]=useState('');
  const move=(id,dir)=>{setCols(prev=>{const next={};COLS.forEach(c=>next[c]=[...prev[c]]);let fromCol,card;COLS.forEach(c=>{const idx=next[c].findIndex(x=>x.id===id);if(idx>-1){fromCol=c;card=next[c].splice(idx,1)[0];}});if(!fromCol||!card)return prev;const ti=Math.max(0,Math.min(COLS.length-1,COLS.indexOf(fromCol)+dir));card.col=COLS[ti];next[COLS[ti]]=[...next[COLS[ti]],card];return next;});};
  const addCard=()=>{if(!newTitle.trim())return;setCols(prev=>({...prev,'Idée':[...prev['Idée'],{id:Date.now(),t:newTitle,cat:'custom',b:'purple',score:'-',col:'Idée'}]}));setNewTitle('');};
  return(
    <div>
      <div style={{fontSize:16,fontWeight:600,color:'#111827',marginBottom:4}}>Pipeline vidéo</div>
      <div style={{background:'#fef9c3',border:'1px solid #fde68a',borderRadius:8,padding:'8px 12px',fontSize:12,color:'#92400e',marginBottom:14}}>💡 Ordre : <b>Idée → Titre & Miniature → Recherche → Script → Tournage → Publié</b></div>
      <div style={{display:'flex',gap:8,marginBottom:16}}><Input value={newTitle} onChange={setNewTitle} placeholder="Ajouter une idée..."/><Btn label="+ Ajouter" onClick={addCard} primary/></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:6}}>
        {COLS.map((col,ci)=>(
          <div key={col}>
            <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:8}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:COL_DOT[ci],flexShrink:0}}/>
              <span style={{fontSize:10,fontWeight:600,color:'#6b7280',textTransform:'uppercase',letterSpacing:'.04em'}}>{col}</span>
              <span style={{marginLeft:'auto',fontSize:10,background:COL_BG[ci],color:COL_DOT[ci],padding:'1px 5px',borderRadius:8,fontWeight:600}}>{cols[col].length}</span>
            </div>
            <div style={{minHeight:60,background:COL_BG[ci],borderRadius:8,padding:5,display:'flex',flexDirection:'column',gap:4}}>
              {cols[col].map(card=>(
                <div key={card.id} style={{background:'#fff',borderRadius:6,padding:'7px 9px',border:'1px solid #e5e7eb'}}>
                  <div style={{fontSize:11,fontWeight:500,color:'#111827',lineHeight:1.3,marginBottom:5}}>{card.t}</div>
                  <div style={{display:'flex',gap:3}}>
                    {COLS.indexOf(card.col)>0&&<button onClick={()=>move(card.id,-1)} style={{fontSize:9,padding:'2px 5px',borderRadius:4,border:'1px solid #d1d5db',background:'none',cursor:'pointer',color:'#6b7280'}}>←</button>}
                    {COLS.indexOf(card.col)<COLS.length-1&&<button onClick={()=>move(card.id,1)} style={{fontSize:9,padding:'2px 5px',borderRadius:4,border:'1px solid #7c3aed',background:'#ede9fe',cursor:'pointer',color:'#7c3aed'}}>→</button>}
                  </div>
                </div>
              ))}
              {cols[col].length===0&&<div style={{fontSize:10,color:'#9ca3af',textAlign:'center',padding:'12px 4px'}}>Vide</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MES SCRIPTS ───────────────────────────────────────────────────────────────
function MesScripts({scripts,setScripts}){
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');
  const [view,setView]=useState(null);
  const [dragOver,setDragOver]=useState(false);
  const fileRef=useRef(null);

  const readAsText=(file)=>new Promise((res,rej)=>{const r=new FileReader();r.onload=e=>res(e.target.result||'');r.onerror=()=>rej();r.readAsText(file,'utf-8');});
  const readPdf=async(file)=>{
    if(!window.pdfjsLib){await new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s);});window.pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';}
    const ab=await file.arrayBuffer();const pdf=await window.pdfjsLib.getDocument({data:ab}).promise;let txt='';
    for(let i=1;i<=pdf.numPages;i++){const p=await pdf.getPage(i);const c=await p.getTextContent();txt+=c.items.map(x=>x.str).join(' ')+'\n';}
    return txt.trim();
  };
  const loadFile=async(file)=>{if(!file)return;const name=file.name.replace(/\.[^.]+$/,'');setTitle(name);setBody('⏳ Lecture...');try{const t=file.name.endsWith('.pdf')?await readPdf(file):await readAsText(file);setBody(t||'');}catch{setBody('');}};
  const onFileInput=(e)=>{loadFile(e.target.files?.[0]);e.target.value='';};
  const onDrop=(e)=>{e.preventDefault();setDragOver(false);loadFile(e.dataTransfer.files?.[0]);};
  const add=()=>{if(!title.trim()||!body.trim())return;setScripts(prev=>[...prev,{id:Date.now(),title:title.trim(),body:body.trim(),date:new Date().toLocaleDateString('fr-FR')}]);setTitle('');setBody('');};
  const del=(id)=>setScripts(prev=>prev.filter(s=>s.id!==id));
  const dna=()=>{if(scripts.length===0)return null;const all=scripts.map(s=>s.body).join('\n\n');const sentences=all.split(/[.!?]+/).map(s=>s.trim()).filter(s=>s.length>10);const avgLen=Math.round(sentences.reduce((a,s)=>a+s.split(' ').length,0)/Math.max(sentences.length,1));const excl=(all.match(/!/g)||[]).length;const quest=(all.match(/\?/g)||[]).length;const caps=(all.match(/\b[A-ZÀÉÈÊ]{2,}\b/g)||[]).length;const words=all.toLowerCase().split(/\s+/);const freq={};const stops=new Set(['mais','donc','avec','dans','pour','cette','tout','plus','bien','très','aussi','comme','quand','même','être','avoir','faire','nous','vous','ils','elles','leur','leurs','votre','notre','vos','nos','est','les','des','une','que','qui','sur','par','pas']);words.forEach(w=>{if(w.length>4&&!stops.has(w))freq[w]=(freq[w]||0)+1;});const top=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([w])=>w);return{avgLen,excl,quest,caps,top,count:scripts.length,chars:all.length};};
  const d=dna();
  const FMT_LABEL={'pire-pouvoir':'💀 Pire pouvoir','combien':'💸 Combien','possible':'🔬 Possible','survivre':'🛡️ Survivre','fait-quoi':'⚡ Fait quoi','entrainement':'💪 Entraînement','calories':'🔥 Calories'};
  const FMT_BG={'pire-pouvoir':'#ede9fe','combien':'#fef3c7','possible':'#dbeafe','survivre':'#fee2e2','fait-quoi':'#ccfbf1','entrainement':'#dcfce7','calories':'#fef9c3'};
  const FMT_TC={'pire-pouvoir':'#5b21b6','combien':'#92400e','possible':'#1d4ed8','survivre':'#991b1b','fait-quoi':'#0f766e','entrainement':'#15803d','calories':'#b45309'};
  return(
    <div>
      <div style={{fontSize:16,fontWeight:600,color:'#111827',marginBottom:4}}>Mes scripts</div>
      <div style={{fontSize:13,color:'#6b7280',marginBottom:16}}>Alimente la base pour que l'IA reproduise fidèlement ton style par format.</div>
      {scripts.length===0?(
        <div style={{textAlign:'center',padding:'24px',color:'#9ca3af',fontSize:13,border:'1px dashed #e5e7eb',borderRadius:10,marginBottom:16}}>Aucun script. Ajoute tes vidéos existantes.</div>
      ):(
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:600,color:'#6b7280',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:10}}>{scripts.length} script{scripts.length>1?'s':''} en base</div>
          {scripts.map(s=>{
            const isOpen=view?.id===s.id;const fmt=detectFormat(s.body);const label=FMT_LABEL[fmt]||'📄 Format libre';const bg=FMT_BG[fmt]||'#f3f4f6';const tc=FMT_TC[fmt]||'#6b7280';
            return(
              <div key={s.id} style={{border:'1px solid #e5e7eb',borderRadius:10,marginBottom:8,overflow:'hidden',background:'#fff'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px'}}>
                  <div style={{width:36,height:36,borderRadius:8,background:bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:18}}>{label.split(' ')[0]}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:'#111827',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.title}</div>
                    <div style={{display:'flex',gap:6,marginTop:3,flexWrap:'wrap'}}>
                      <span style={{fontSize:10,padding:'1px 7px',borderRadius:10,background:bg,color:tc,fontWeight:500}}>{label.split(' ').slice(1).join(' ')}</span>
                      <span style={{fontSize:11,color:'#9ca3af'}}>{s.date} · {s.body.length.toLocaleString('fr-FR')} car.</span>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:5,flexShrink:0}}>
                    <button onClick={()=>setView(isOpen?null:s)} style={{fontSize:11,padding:'4px 10px',borderRadius:6,border:'1px solid #d1d5db',background:isOpen?'#f3f4f6':'none',color:'#6b7280',cursor:'pointer'}}>{isOpen?'▲':'▼'}</button>
                    <button onClick={()=>del(s.id)} style={{fontSize:11,padding:'4px 10px',borderRadius:6,border:'1px solid #fca5a5',background:'#fee2e2',color:'#dc2626',cursor:'pointer',fontWeight:500}}>Suppr.</button>
                  </div>
                </div>
                {!isOpen&&<div style={{padding:'6px 14px 10px',fontSize:12,color:'#9ca3af',fontStyle:'italic'}}>{s.body.slice(0,120).replace(/\s+/g,' ')}…</div>}
                {isOpen&&<div style={{padding:'12px 14px',fontSize:12,color:'#374151',lineHeight:1.8,whiteSpace:'pre-wrap',maxHeight:260,overflowY:'auto',background:'#f9fafb'}}>{s.body}</div>}
              </div>
            );
          })}
        </div>
      )}
      {d&&(
        <div style={{background:'#ede9fe',border:'1px solid #c4b5fd',borderRadius:10,padding:'14px 16px',marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:600,color:'#5b21b6',marginBottom:10}}>🧬 ADN de style — {d.count} script{d.count>1?'s':''}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:10}}>
            {[['~'+d.avgLen+' mots','par phrase'],[d.excl,'exclamations'],[d.quest,'questions'],[d.caps,'mots CAPS'],[d.chars.toLocaleString('fr-FR'),'caractères'],[d.count,'scripts']].map(([v,l])=>(
              <div key={l} style={{background:'#fff',borderRadius:7,padding:'8px 10px'}}><div style={{fontSize:15,fontWeight:700,color:'#5b21b6'}}>{v}</div><div style={{fontSize:11,color:'#7c3aed'}}>{l}</div></div>
            ))}
          </div>
          <div style={{fontSize:12,color:'#5b21b6'}}><b>Mots-clés :</b> {d.top.join(', ')}</div>
        </div>
      )}
      <Card>
        <div style={{fontSize:13,fontWeight:500,color:'#111827',marginBottom:12}}>Ajouter un script</div>
        <div onClick={()=>fileRef.current?.click()} onDrop={onDrop} onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)}
          style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'16px',marginBottom:12,borderRadius:8,border:`2px dashed ${dragOver?'#7c3aed':'#d1d5db'}`,background:dragOver?'#ede9fe':'#f9fafb',cursor:'pointer'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={dragOver?'#7c3aed':'#9ca3af'} strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <div style={{fontSize:13,fontWeight:500,color:dragOver?'#7c3aed':'#6b7280'}}>Clique ou glisse un fichier</div>
          <div style={{fontSize:11,color:'#9ca3af'}}>.txt · .md · .pdf</div>
          <input ref={fileRef} type="file" accept=".txt,.md,.text,.pdf" style={{display:'none'}} onChange={onFileInput}/>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}><div style={{flex:1,height:1,background:'#e5e7eb'}}/><span style={{fontSize:11,color:'#9ca3af'}}>ou colle directement</span><div style={{flex:1,height:1,background:'#e5e7eb'}}/></div>
        <div style={{marginBottom:8}}><Input value={title} onChange={setTitle} placeholder="Titre de la vidéo"/></div>
        <Textarea value={body} onChange={setBody} placeholder="Colle ici le texte de ton script..." rows={5}/>
        <div style={{marginTop:10,display:'flex',justifyContent:'flex-end'}}><Btn label="Ajouter à la base" onClick={add} primary/></div>
      </Card>
    </div>
  );
}

// ── ESPACE SCRIPT ─────────────────────────────────────────────────────────────
function EspaceScript({scripts}){
  const [step,setStep]=useState(0);
  const [brief,setBrief]=useState({titre:'',angle:'',duree:'8',audience:'existante',format:'pire-pouvoir'});
  const [structure,setStructure]=useState(null);
  const [loading,setLoading]=useState(false);
  const [checks,setChecks]=useState([false,false,false,false,false]);
  const [editableScript,setEditableScript]=useState('');
  const formats=[{v:'pire-pouvoir',l:'Pourquoi [POUVOIR] serait le PIRE ?'},{v:'fait-quoi',l:"[POUVOIR] en VRAI, ça fait QUOI ?"},{v:'entrainement',l:"L'ENTRAÎNEMENT de [PERSO] en vrai"},{v:'combien',l:'Devenir [PERSO] en vrai, ça coûte COMBIEN ?'},{v:'possible',l:"[POUVOIR] en VRAI, c'est POSSIBLE ?"},{v:'survivre',l:'La SEULE façon de SURVIVRE à [MONDE]'},{v:'calories',l:'COMBIEN de CALORIES pour [COUP] en vrai ?'},{v:'libre',l:'Format libre'}];
  const durees=[{v:'5',l:'5 min'},{v:'8',l:'8 min'},{v:'12',l:'12 min'},{v:'15',l:'15 min'}];
  const buildStructure=()=>{const d=parseInt(brief.duree);const acts=[{nom:'⚡ Accroche',t:'0:00–0:30',desc:'Question choc dans les 30 premières secondes.'},{nom:'🎯 Contexte',t:`0:30–${d<8?'1:30':'2:00'}`,desc:'Présentation rapide pour les non-initiés.'},{nom:'🔬 Développement',t:`${d<8?'1:30':'2:00'}–${d<8?'3:30':'5:00'}`,desc:'3 arguments scientifiques sourcés et vulgarisés.'},{nom:'😱 Point fort',t:`${d<8?'3:30':'5:00'}–${d<8?'4:30':'6:30'}`,desc:"L'info la plus mémorable."},{nom:'🎬 Conclusion + CTA',t:`${d<8?'4:30':'6:30'}–${brief.duree}:00`,desc:'Résumé + question commentaires + abonnement.'}];setStructure(acts);setStep(2);};
  const buildStyleContext=()=>{
    if(scripts.length===0)return"Style YouTube francophone dynamique : phrases courtes, CAPS pour insister, questions rhétoriques, ton fun + rigueur scientifique.";
    const same=scripts.filter(s=>detectFormat(s.body)===brief.format);
    const other=scripts.filter(s=>detectFormat(s.body)!==brief.format);
    const selected=[...same.slice(0,2),...other.slice(0,1)];
    const fallback=selected.length===0?scripts.slice(0,2):selected;
    const extracts=fallback.map(s=>s.body.slice(0,300)).join('\n---\n');
    const all=scripts.map(s=>s.body).join(' ').slice(0,2000);
    const excl=(all.match(/!/g)||[]).length;const quest=(all.match(/\?/g)||[]).length;const caps=(all.match(/\b[A-ZÀÉÈÊ]{2,}\b/g)||[]).length;
    const note=same.length>0?`⚠️ ${same.length} script(s) du même format — utilise comme référence principale.`:`Aucun script de ce format exact.`;
    return`Imite ce style.\n${note}\nExtraits :\n${extracts}\nStats : ${excl} exclamations, ${quest} questions, ${caps} mots CAPS.`;
  };
  const generateScript=async()=>{
    setLoading(true);setStep(3);
    const styleCtx=buildStyleContext();
    const structText=structure.map(a=>`${a.nom} (${a.t}) : ${a.desc}`).join('\n');
    const prompt=`${styleCtx.slice(0,800)}\n\nScript YouTube complet :\n- Titre : ${brief.titre?.slice(0,100)||'[non défini]'}\n- Angle : ${brief.angle?.slice(0,200)||'[non précisé]'}\n- Format : ${formats.find(f=>f.v===brief.format)?.l}\n- Durée : ${brief.duree} min\n- Audience : ${brief.audience==='existante'?'Fans anime/comics':'Nouvelle audience'}\n\nStructure :\n${structText.slice(0,400)}\n\nRédige mot pour mot, indications [COUPE/ANIMATION], sources scientifiques réelles, accroche 30s, UNE question finale.`;
    try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});const data=await r.json();const t=data.content?.map(b=>b.text||'').join('')||'Erreur.';setEditableScript(t);}catch{setEditableScript("Erreur de connexion.");}
    setLoading(false);
  };
  const checkItems=['Style personnel respecté','Ton fun et engageant','Faits scientifiques sourcés','Accroche forte (30 premières secondes)','CTA clair en fin'];
  const reset=()=>{setStep(0);setStructure(null);setEditableScript('');setChecks([false,false,false,false,false]);setBrief({titre:'',angle:'',duree:'8',audience:'existante',format:'pire-pouvoir'});};
  const stepLabels=['Brief','Structure','Script','Finalisation'];
  return(
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
        <div style={{fontSize:16,fontWeight:600,color:'#111827'}}>Espace Script</div>
        {step>0&&<Btn label="Recommencer" small onClick={reset}/>}
      </div>
      <div style={{fontSize:13,color:'#6b7280',marginBottom:16}}>{scripts.length>0?`✅ ${scripts.length} script(s) en base.`:'⚠️ Ajoute tes scripts dans "Mes scripts".'}</div>
      <div style={{display:'flex',gap:0,marginBottom:20}}>
        {stepLabels.map((s,i)=>(
          <div key={s} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',position:'relative'}}>
            {i<stepLabels.length-1&&<div style={{position:'absolute',top:12,left:'50%',width:'100%',height:2,background:i<step?'#7c3aed':'#e5e7eb',zIndex:0}}/>}
            <div style={{width:24,height:24,borderRadius:'50%',background:i<=step?'#7c3aed':'#e5e7eb',color:i<=step?'#fff':'#9ca3af',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',zIndex:1,position:'relative'}}>{i<step?'✓':i+1}</div>
            <div style={{fontSize:10,color:i===step?'#7c3aed':'#9ca3af',marginTop:4,fontWeight:i===step?600:400}}>{s}</div>
          </div>
        ))}
      </div>
      {step===0&&(
        <Card>
          <div style={{fontSize:13,fontWeight:500,color:'#111827',marginBottom:12}}>Brief</div>
          <div style={{marginBottom:10}}><label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:4}}>Titre</label><Input value={brief.titre} onChange={v=>setBrief(b=>({...b,titre:v}))} placeholder="Ex: Pourquoi GEAR 5 serait le PIRE pouvoir en vrai ?"/></div>
          <div style={{marginBottom:10}}><label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:4}}>Angle</label><Input value={brief.angle} onChange={v=>setBrief(b=>({...b,angle:v}))} placeholder="Ex: Gear 5 = problèmes physiologiques catastrophiques"/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
            <div><label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:4}}>Format</label>
              <select value={brief.format} onChange={e=>setBrief(b=>({...b,format:e.target.value}))} style={{width:'100%',padding:'8px 10px',borderRadius:8,border:'1px solid #e5e7eb',fontSize:12,background:'#fff'}}>
                {formats.map(f=><option key={f.v} value={f.v}>{f.l}</option>)}
              </select>
            </div>
            <div><label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:4}}>Durée</label>
              <select value={brief.duree} onChange={e=>setBrief(b=>({...b,duree:e.target.value}))} style={{width:'100%',padding:'8px 10px',borderRadius:8,border:'1px solid #e5e7eb',fontSize:12,background:'#fff'}}>
                {durees.map(d=><option key={d.v} value={d.v}>{d.l}</option>)}
              </select>
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,color:'#6b7280',display:'block',marginBottom:6}}>Audience</label>
            <div style={{display:'flex',gap:8}}>
              {[['existante','🎯 Existante'],['nouvelle','🚀 Nouvelle']].map(([v,l])=>(
                <button key={v} onClick={()=>setBrief(b=>({...b,audience:v}))} style={{flex:1,padding:'8px',borderRadius:8,border:`2px solid ${brief.audience===v?'#7c3aed':'#e5e7eb'}`,background:brief.audience===v?'#ede9fe':'#fff',color:brief.audience===v?'#5b21b6':'#6b7280',fontSize:12,cursor:'pointer',fontWeight:brief.audience===v?600:400}}>{l}</button>
              ))}
            </div>
          </div>
          <Btn label="Générer la structure →" onClick={buildStructure} primary/>
        </Card>
      )}
      {step===2&&structure&&(
        <Card>
          <div style={{fontSize:13,fontWeight:500,color:'#111827',marginBottom:12}}>Structure — {brief.duree} min</div>
          {structure.map((act,i)=>(
            <div key={i} style={{display:'flex',gap:10,marginBottom:10,paddingBottom:10,borderBottom:i<structure.length-1?'1px solid #f3f4f6':'none'}}>
              <div style={{width:30,height:30,borderRadius:8,background:'#ede9fe',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,flexShrink:0}}>{act.nom.split(' ')[0]}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                  <span style={{fontSize:13,fontWeight:500,color:'#111827'}}>{act.nom.split(' ').slice(1).join(' ')}</span>
                  <span style={{fontSize:11,color:'#9ca3af',background:'#f3f4f6',padding:'1px 8px',borderRadius:10}}>{act.t}</span>
                </div>
                <div style={{fontSize:12,color:'#6b7280'}}>{act.desc}</div>
              </div>
            </div>
          ))}
          <div style={{display:'flex',gap:8}}><Btn label="← Brief" onClick={()=>setStep(0)}/><Btn label="Générer le script →" onClick={generateScript} primary/></div>
        </Card>
      )}
      {step===3&&(loading?
        <Card><div style={{textAlign:'center',padding:'32px',color:'#7c3aed'}}><div style={{fontSize:24,marginBottom:12}}>✍️</div><div style={{fontSize:14,fontWeight:500}}>Génération en cours...</div></div></Card>:
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div style={{fontSize:13,fontWeight:500,color:'#111827'}}>Script généré</div>
            <Btn label="Finaliser →" small primary onClick={()=>setStep(4)}/>
          </div>
          <Textarea value={editableScript} onChange={setEditableScript} rows={16}/>
        </Card>
      )}
      {step===4&&(
        <div>
          <Card>
            <div style={{fontSize:13,fontWeight:500,color:'#111827',marginBottom:12}}>Checklist finale</div>
            {checkItems.map((item,i)=>(<div key={i} onClick={()=>setChecks(c=>c.map((v,j)=>j===i?!v:v))} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:i<checkItems.length-1?'1px solid #f3f4f6':'none',cursor:'pointer'}}>
              <div style={{width:18,height:18,borderRadius:5,border:`1.5px solid ${checks[i]?'#7c3aed':'#d1d5db'}`,background:checks[i]?'#7c3aed':'none',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{checks[i]&&<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
              <span style={{fontSize:13,color:checks[i]?'#9ca3af':'#111827',textDecoration:checks[i]?'line-through':'none'}}>{item}</span>
            </div>))}
            <div style={{marginTop:14,padding:'10px',background:checks.every(Boolean)?'#dcfce7':'#f9fafb',borderRadius:8,textAlign:'center',fontSize:13,color:checks.every(Boolean)?'#15803d':'#9ca3af',fontWeight:500}}>{checks.every(Boolean)?'✅ Prêt pour le tournage !':'Complète la checklist'}</div>
          </Card>
          <Card><div style={{fontSize:13,fontWeight:500,color:'#111827',marginBottom:8}}>Script final</div><Textarea value={editableScript} onChange={setEditableScript} rows={12}/></Card>
        </div>
      )}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState('overview');
  const [ideaFilter,setIdeaFilter]=useState('all');
  const [mChecks,setMChecks]=useState(maintenanceChecklist.map(()=>false));
  const [scripts,setScripts]=useState([]);

  const navItems=[
    {id:'overview',label:"Vue d'ensemble",group:'Dashboard'},
    {id:'ideas',label:'Idées vidéos',group:'Création',badge:'12'},
    {id:'newformats',label:'Nouveaux formats',group:'Création',badge:'6'},
    {id:'titles',label:'Workshop Titres',group:'Création',badge:'IA'},
    {id:'thumbs',label:'Workshop Miniatures',group:'Création',badge:'IA'},
    {id:'pipeline',label:'Pipeline',group:'Création'},
    {id:'calendrier',label:'Calendrier',group:'Création',badge:'📅'},
    {id:'script',label:'Espace Script',group:'Création',badge:'IA'},
    {id:'topvideos',label:'Top vidéos + CTR',group:'Données'},
    {id:'analyse',label:'Analyse data',group:'Données',badge:'🔍'},
    {id:'audience',label:'Audience',group:'Données'},
    {id:'messcripts',label:'Mes scripts',group:'Données',badge:scripts.length>0?String(scripts.length):undefined},
    {id:'update',label:'Mise à jour',group:'Données'},
  ];

  const filteredIdeas=ideaFilter==='all'?ideas:ideas.filter(i=>i.cat===ideaFilter);
  const groups=[...new Set(navItems.map(n=>n.group))];

  return(
    <div style={{display:'grid',gridTemplateColumns:'190px 1fr',minHeight:600,border:'1px solid #e5e7eb',borderRadius:12,overflow:'hidden',fontFamily:'system-ui,sans-serif',fontSize:14}}>
      <div style={{background:'#f9fafb',borderRight:'1px solid #e5e7eb',display:'flex',flexDirection:'column'}}>
        <div style={{padding:'14px 14px 10px',borderBottom:'1px solid #e5e7eb'}}>
          <div style={{fontSize:10,fontWeight:600,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:3}}>Content Studio v3</div>
          <div style={{fontSize:14,fontWeight:600,color:'#111827'}}>La Poire Fendue</div>
          <div style={{fontSize:11,color:'#9ca3af',marginTop:2}}>Science vs Pop Culture</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5,padding:'10px 10px 8px'}}>
          {[['153 921','Abonnés'],['222','Vidéos'],['310K','Top vidéo'],['4,52%','CTR moy.']].map(([v,l])=>(
            <div key={l} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:7,padding:'6px 8px'}}>
              <div style={{fontSize:10,color:'#9ca3af'}}>{l}</div>
              <div style={{fontSize:13,fontWeight:600,color:'#111827'}}>{v}</div>
            </div>
          ))}
        </div>
        <nav style={{flex:1,padding:'4px 0',overflowY:'auto'}}>
          {groups.map(group=>(
            <div key={group}>
              <div style={{padding:'8px 12px 3px',fontSize:10,fontWeight:600,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'.08em'}}>{group}</div>
              {navItems.filter(n=>n.group===group).map(n=>(
                <div key={n.id} onClick={()=>setPage(n.id)} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 12px',cursor:'pointer',fontSize:13,color:page===n.id?'#7c3aed':'#4b5563',background:page===n.id?'#ede9fe':'none',borderLeft:page===n.id?'2px solid #7c3aed':'2px solid transparent',fontWeight:page===n.id?500:400}}>
                  <div style={{width:5,height:5,borderRadius:'50%',background:page===n.id?'#7c3aed':'#d1d5db',flexShrink:0}}/>
                  <span style={{flex:1}}>{n.label}</span>
                  {n.badge&&<span style={{background:['IA'].includes(n.badge)?'#2563eb':'#7c3aed',color:'#fff',fontSize:10,padding:'1px 5px',borderRadius:8}}>{n.badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div style={{padding:'20px 22px',overflowY:'auto',maxHeight:680,background:'#fff'}}>

        {page==='titles'&&<WorkshopTitres/>}
        {page==='thumbs'&&<WorkshopMiniatures/>}
        {page==='calendrier'&&<Calendrier/>}
        {page==='pipeline'&&<Pipeline/>}
        {page==='script'&&<EspaceScript scripts={scripts}/>}
        {page==='messcripts'&&<MesScripts scripts={scripts} setScripts={setScripts}/>}

        {page==='overview'&&(
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'#111827',marginBottom:4}}>Vue d'ensemble</div>
            <div style={{fontSize:13,color:'#6b7280',marginBottom:4}}>Données réelles · Mise à jour : <b>24 avril 2026</b></div>
            <div style={{background:'#fef9c3',border:'1px solid #fde68a',borderRadius:8,padding:'8px 12px',fontSize:12,color:'#92400e',marginBottom:14}}>
              🎯 <b>Insight clé :</b> 76,2% de nouveaux spectateurs — machine d'acquisition, fidélisation à travailler (1,3% de réguliers).
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
              {[['153 921','Abonnés réels'],['10,7%','Meilleur CTR (Flash)'],['76,2%','Nouveaux spectateurs'],['1,3%','Spectateurs réguliers']].map(([v,l])=>(
                <div key={l} style={{background:'#f9fafb',borderRadius:8,padding:'10px 12px'}}>
                  <div style={{fontSize:11,color:'#9ca3af'}}>{l}</div>
                  <div style={{fontSize:17,fontWeight:600,color:'#111827',marginTop:2}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:13,fontWeight:600,color:'#111827',marginBottom:8}}>🏆 CTR réel par format</div>
            {[
              {fmt:"⚡ Fait quoi / Physique",ctr:"7.3–10.7%",ex:"Flash 10.7%, Sharingan 7.3%, Zone 8.4%",color:"#ccfbf1",tc:"#0f766e"},
              {fmt:"💪 Entraînement",ctr:"7.7–8.8%",ex:"Rock Lee 8.8%, Baki 7.7%, Naruto 7.8%",color:"#dcfce7",tc:"#15803d"},
              {fmt:"💀 Pire pouvoir",ctr:"6.0–8.4%",ex:"Voler 8.4%, Homelander 7.3%, Venom 6.8%",color:"#ede9fe",tc:"#5b21b6"},
              {fmt:"🔬 C'est possible ?",ctr:"5.2–7.2%",ex:"Blue Lock 7.2%, Spiderman 5.9%",color:"#dbeafe",tc:"#1d4ed8"},
              {fmt:"💸 Combien ça coûte",ctr:"4.8–5.2%",ex:"Batman 5.2%, Iron Man 4.8%",color:"#fef3c7",tc:"#92400e"},
            ].map(f=>(
              <div key={f.fmt} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',marginBottom:6,borderRadius:8,background:f.color}}>
                <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:f.tc}}>{f.fmt}</div><div style={{fontSize:11,color:'#6b7280',marginTop:2}}>{f.ex}</div></div>
                <div style={{fontSize:16,fontWeight:700,color:f.tc}}>{f.ctr}</div>
              </div>
            ))}
            <div style={{fontSize:13,fontWeight:600,color:'#111827',margin:'16px 0 8px'}}>📅 Calendrier opportunités 2026</div>
            {[
              {date:'🟢 Maintenant',event:'JJK Saison 3 en cours',angle:'Domaine expansion Sukuna — format pire pouvoir',urgence:98},
              {date:'🟡 Mai 2026',event:'GP Monaco F1 (7 juin)',angle:"Entraînement pilote F1 — timing parfait",urgence:85},
              {date:'🟡 Juillet 2026',event:'Spider-Man: Brand New Day (29 juil.)',angle:"Pourquoi Spider-Man serait impossible — 3 semaines avant",urgence:97},
              {date:'🔴 Déc 2026',event:'Avengers: Doomsday (16 déc.)',angle:"Doctor Doom — pire vilain à affronter en vrai",urgence:96},
            ].map(e=>(
              <div key={e.event} style={{display:'flex',gap:10,padding:'8px 12px',marginBottom:5,borderRadius:8,background:'#f9fafb',border:'1px solid #e5e7eb'}}>
                <div style={{fontSize:11,color:'#6b7280',width:90,flexShrink:0,paddingTop:2}}>{e.date}</div>
                <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:'#111827'}}>{e.event}</div><div style={{fontSize:11,color:'#6b7280'}}>{e.angle}</div></div>
                <div style={{fontSize:11,fontWeight:600,color:'#7c3aed',flexShrink:0}}>{e.urgence}/100</div>
              </div>
            ))}
          </div>
        )}

        {page==='ideas'&&(
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'#111827',marginBottom:4}}>Idées vidéos</div>
            <div style={{fontSize:13,color:'#6b7280',marginBottom:12}}>12 idées basées sur tes perfs réelles + tendances 2026.</div>
            <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:14}}>
              {[['all','Toutes'],['anime','Anime'],['marvel','Marvel/DC'],['f1','F1/Sport'],['calories','🔥 Calories']].map(([val,label])=>(
                <button key={val} onClick={()=>setIdeaFilter(val)} style={{fontSize:11,padding:'4px 12px',borderRadius:20,border:`1px solid ${ideaFilter===val?'#7c3aed':'#d1d5db'}`,background:ideaFilter===val?'#7c3aed':'none',color:ideaFilter===val?'#fff':'#6b7280',cursor:'pointer'}}>{label}</button>
              ))}
            </div>
            {filteredIdeas.map((idea,i)=>(
              <Card key={i}>
                <div style={{display:'flex',justifyContent:'space-between',gap:8,marginBottom:6}}>
                  <div style={{fontWeight:500,fontSize:14,color:'#111827',flex:1,lineHeight:1.4}}>{idea.t}</div>
                  <Badge color={idea.b}>{idea.bl}</Badge>
                </div>
                <div style={{fontSize:12,color:'#6b7280',marginBottom:8,lineHeight:1.6}}>{idea.d}</div>
                <div style={{display:'flex',gap:12,fontSize:11,color:'#9ca3af',marginBottom:4,flexWrap:'wrap'}}>
                  <span><b style={{color:'#6b7280'}}>Score</b> {idea.score}/100</span>
                  <span><b style={{color:'#6b7280'}}>Vues est.</b> {idea.v}</span>
                  <span><b style={{color:'#6b7280'}}>CTR prédit</b> {idea.ctr_pred}</span>
                  <span><b style={{color:'#6b7280'}}>Timing</b> {idea.timing}</span>
                </div>
                <ScoreBar score={idea.score}/>
                <div style={{display:'flex',gap:5}}>
                  <Btn label="Workshop titres ↗" small onClick={()=>setPage('titles')}/>
                  <Btn label="Workshop miniatures ↗" small onClick={()=>setPage('thumbs')}/>
                  <Btn label="Calendrier ↗" small onClick={()=>setPage('calendrier')}/>
                </div>
              </Card>
            ))}
          </div>
        )}

        {page==='newformats'&&(
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'#111827',marginBottom:4}}>Nouveaux formats</div>
            <div style={{fontSize:13,color:'#6b7280',marginBottom:14}}>Pour renouveler la chaîne et travailler la fidélisation.</div>
            {newFormats.map((f,i)=>(
              <Card key={i}>
                <div style={{display:'flex',justifyContent:'space-between',gap:8,marginBottom:8}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:20}}>{f.icon}</span><div style={{fontWeight:600,fontSize:14,color:'#111827'}}>{f.titre}</div></div>
                  <Badge color={f.potentiel.includes('Fort')?'green':'amber'}>{f.potentiel}</Badge>
                </div>
                <div style={{fontSize:12,color:'#6b7280',marginBottom:10,lineHeight:1.6}}>{f.desc}</div>
                <div style={{display:'flex',gap:12,fontSize:11,color:'#9ca3af',marginBottom:10}}>
                  <span><b style={{color:'#6b7280'}}>CTR prédit</b> {f.ctr_pred}</span>
                  <span><b style={{color:'#6b7280'}}>Fidélisation</b> {f.fidelisation}</span>
                </div>
                <div style={{background:'#f9fafb',borderRadius:8,padding:'10px 12px'}}>
                  {f.exemples.map((ex,j)=><div key={j} style={{fontSize:12,color:'#374151',padding:'3px 0',borderBottom:j<f.exemples.length-1?'1px solid #f3f4f6':'none'}}>→ {ex}</div>)}
                </div>
              </Card>
            ))}
          </div>
        )}

        {page==='topvideos'&&(
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'#111827',marginBottom:4}}>Top vidéos + CTR 24h</div>
            <div style={{fontSize:13,color:'#6b7280',marginBottom:14}}>Classées par vues avec CTR réel.</div>
            <div style={{border:'1px solid #e5e7eb',borderRadius:10,overflow:'hidden'}}>
              {ctrData.sort((a,b)=>b.views-a.views).map((v,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 14px',borderBottom:i<ctrData.length-1?'1px solid #f3f4f6':'none'}}>
                  <div style={{fontSize:12,fontWeight:500,color:'#9ca3af',width:18,textAlign:'right',flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:500,color:'#111827',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{v.t}</div>
                    <div style={{fontSize:11,color:'#9ca3af'}}>{v.views.toLocaleString('fr-FR')} vues</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
                    <div style={{width:50,height:3,background:'#f3f4f6',borderRadius:2}}><div style={{width:`${Math.round(v.ctr/11*100)}%`,height:'100%',background:v.ctr>=8?'#16a34a':v.ctr>=6.5?'#d97706':'#6b7280',borderRadius:2}}/></div>
                    <span style={{fontSize:12,fontWeight:700,color:v.ctr>=8?'#16a34a':v.ctr>=6.5?'#d97706':'#6b7280',width:38,textAlign:'right'}}>{v.ctr}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page==='analyse'&&(
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'#111827',marginBottom:4}}>Analyse data — insights réels</div>
            <div style={{fontSize:13,color:'#6b7280',marginBottom:16}}>Basé sur tes 222 vidéos · données réelles CSV · 24 avril 2026.</div>
            <div style={{fontSize:13,fontWeight:600,color:'#111827',marginBottom:8}}>💰 RPM par format</div>
            <Card>
              {[{fmt:'💀 Compilation "PIRES pouvoirs"',rpm:'3,0–5,1 €',ex:'Compil PIRES : 5,14€ · Wolverine : 2,87€',note:'Format le plus rentable — mid-rolls + longue durée'},{fmt:'💸 Combien ça coûte',rpm:'3,1–3,9 €',ex:'Iron Man : 3,89€ · Batman : 4,17€',note:'Bon RPM malgré CTR faible'},{fmt:'⚡ Fait quoi / Physique',rpm:'1,2–2,7 €',ex:'Flash : 1,38€ · Sharingan : 1,60€',note:'Beaucoup de vues mais RPM modéré'},{fmt:"🔬 C'est possible",rpm:'1,3–1,8 €',ex:'Nen HxH : 1,31€ · Blue Lock : 1,39€',note:'Fort volume mais RPM standard'},{fmt:'💪 Entraînement',rpm:'1,1–2,0 €',ex:'Baki : 1,79€ · Rock Lee : 1,14€',note:'Bon engagement mais RPM limité'}].map((r,i)=>(
                <div key={i} style={{display:'flex',gap:12,padding:'10px 0',borderBottom:i<4?'1px solid #f3f4f6':'none',alignItems:'flex-start'}}>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:'#111827'}}>{r.fmt}</div><div style={{fontSize:11,color:'#6b7280',marginTop:2}}>{r.ex}</div><div style={{fontSize:11,color:'#9ca3af',marginTop:2,fontStyle:'italic'}}>{r.note}</div></div>
                  <div style={{fontSize:16,fontWeight:700,color:'#16a34a',flexShrink:0}}>{r.rpm}</div>
                </div>
              ))}
            </Card>
            <div style={{fontSize:13,fontWeight:600,color:'#111827',margin:'16px 0 8px'}}>⏱️ Durée optimale</div>
            <Card>
              {[{dur:'< 5 min',rpm:'~1,1 €',verdict:'🟡 Pas de mid-rolls. Bon pour vues, mauvais pour revenus.'},{dur:'5–7 min',rpm:'~1,5 €',verdict:'🟢 Zone de confort — meilleur équilibre vues/RPM.'},{dur:'7–10 min',rpm:'~2,2 €',verdict:'🟢 Zone optimale RPM — mid-rolls + bonne rétention.'},{dur:'10–12 min',rpm:'~3,5 €',verdict:'🟢 Excellent RPM — compilations. Supervitesse 245K.'},{dur:'> 12 min',rpm:'~4,0 €',verdict:'🔴 RPM maximal mais vues chutent. Compilations uniquement.'}].map((d,i)=>(
                <div key={i} style={{display:'grid',gridTemplateColumns:'70px 60px 1fr',gap:8,padding:'8px 0',borderBottom:i<4?'1px solid #f3f4f6':'none',alignItems:'center',fontSize:12}}>
                  <div style={{fontWeight:600,color:'#111827'}}>{d.dur}</div>
                  <div style={{color:'#16a34a',fontWeight:600}}>{d.rpm}</div>
                  <div style={{color:'#374151'}}>{d.verdict}</div>
                </div>
              ))}
              <div style={{marginTop:12,background:'#ede9fe',borderRadius:8,padding:'10px 12px',fontSize:12,color:'#5b21b6'}}>🎯 <b>Recommandation :</b> Vise <b>7–10 min</b> pour maximiser vues × RPM.</div>
            </Card>
            <div style={{fontSize:13,fontWeight:600,color:'#111827',margin:'16px 0 8px'}}>📈 Pourquoi un RPM élevé ?</div>
            <Card>
              {[{facteur:'Durée > 8 min → mid-roll ads',impact:'×2 à ×3 le RPM',detail:'Compilations 10–16 min génèrent 3–5€ vs 1–1,5€ pour courtes'},{facteur:'Sujet "techno réelle" → annonceurs tech',impact:'+50–80% CPM',detail:'Iron Man armure, Vibranium → annonceurs tech paient plus'},{facteur:'Audience FR/BE/CA premium',impact:'+30–50%',detail:'Ton audience francophone = CPM élevé vs mondiale'},{facteur:'Taux de visionnage > 60%',impact:'+20–30% CPM',detail:'Plus d\'impressions mid-roll = plus de revenus'},{facteur:'Publication Q4 (oct–déc)',impact:'+40–60% CPM',detail:'Tes vidéos de fin d\'année = meilleurs revenus'}].map((f,i)=>(
                <div key={i} style={{display:'flex',gap:12,padding:'9px 0',borderBottom:i<4?'1px solid #f3f4f6':'none',alignItems:'flex-start'}}>
                  <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:'#111827'}}>{f.facteur}</div><div style={{fontSize:11,color:'#6b7280',marginTop:2}}>{f.detail}</div></div>
                  <div style={{fontSize:12,fontWeight:700,color:'#7c3aed',flexShrink:0}}>{f.impact}</div>
                </div>
              ))}
              <div style={{marginTop:12,background:'#ede9fe',borderRadius:8,padding:'10px 12px',fontSize:12,color:'#5b21b6'}}>🎯 <b>Stratégie revenus :</b> Compilations 10–12 min sur sujets "techno réelle" publiées en Q4 = combinaison gagnante.</div>
            </Card>
          </div>
        )}

        {page==='audience'&&(
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'#111827',marginBottom:4}}>Audience</div>
            <div style={{fontSize:13,color:'#6b7280',marginBottom:16}}>Données réelles — 28 derniers jours.</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:16}}>
              {[['76,2%','Nouveaux spectateurs','#dbeafe','#1d4ed8'],['22,5%','Occasionnels','#fef3c7','#92400e'],['1,3%','Réguliers','#dcfce7','#15803d']].map(([v,l,bg,tc])=>(
                <div key={l} style={{background:bg,borderRadius:10,padding:'14px',textAlign:'center'}}>
                  <div style={{fontSize:22,fontWeight:700,color:tc}}>{v}</div>
                  <div style={{fontSize:12,color:tc,marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{background:'#fef3c7',border:'1px solid #fde68a',borderRadius:8,padding:'10px 14px',fontSize:12,color:'#92400e',marginBottom:16}}>
              ⚠️ <b>Défi :</b> 1,3% de réguliers seulement. Les formats "calories classement" et "entraînement série" sont tes meilleurs leviers de fidélisation.
            </div>
            <div style={{fontSize:13,fontWeight:600,color:'#111827',marginBottom:8}}>📺 Chaînes regardées par ton audience</div>
            <Card>
              {[{n:'Alkor',s:'438K',insight:'Ta plus grande concurrence directe'},{n:'Comment Battre',s:'254K',insight:'Gaming/Pop culture → opportunité gaming'},{n:'Somioka',s:'220K',insight:'Anime FR pur — ton audience principale'},{n:'Le Lore',s:'233K',insight:'Format lore = fidélisation élevée à explorer'},{n:'Jordan Universe',s:'90K',insight:'Comics FR — confirme ton audience cible'},{n:'Kiyu',s:'28,1K',insight:'Très proche de ta niche — surveille ses formats'},{n:'SPIDEY',s:'20,6K',insight:'Marvel spécifique'},{n:'Yacine',s:'42,5K',insight:'Anime FR — signal fort'},{n:'Alkor 2.0',s:'21,7K',insight:'Audience très similaire'},{n:'Alexcalibur01',s:'49,3K',insight:'Vulgarisation pop culture'}].map((ch,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<9?'1px solid #f3f4f6':'none'}}>
                  <div style={{width:32,height:32,borderRadius:'50%',background:'#ede9fe',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'#5b21b6',flexShrink:0}}>{ch.n[0]}</div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:'#111827'}}>{ch.n} <span style={{fontSize:11,color:'#9ca3af'}}>· {ch.s}</span></div><div style={{fontSize:11,color:'#6b7280'}}>{ch.insight}</div></div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {page==='update'&&(
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'#111827',marginBottom:4}}>Protocole mensuel</div>
            <div style={{background:'#ede9fe',border:'1px solid #c4b5fd',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#5b21b6',marginBottom:16}}>
              📅 <b>Dernière mise à jour :</b> 24 avril 2026 · Prochaine : ~24 mai 2026
            </div>
            {[{n:1,title:'Script Python (si quota ok)',desc:'Lance et glisse lpf_data.json ici :',code:'python3 ~/Desktop/yt-scripts/export_complet.py'},{n:2,title:'Exports CSV YouTube Studio',desc:'Analytiques → bouton ↓ Exporter :',items:['Aperçu → CSV global','Contenu → CSV (vues, CTR, impressions)','Audience → CSV','Revenus → CSV (RPM)']},{n:3,title:'Données manuelles',desc:'Screenshots YouTube Studio → Audience :',items:['"Chaînes regardées par ton audience" (toutes pages)','"Populaire auprès de différentes audiences" (3 onglets)']}].map(s=>(
              <div key={s.n} style={{background:'#f9fafb',border:'1px solid #e5e7eb',borderRadius:10,padding:'14px 16px',marginBottom:8}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <div style={{width:20,height:20,borderRadius:'50%',background:'#7c3aed',color:'#fff',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{s.n}</div>
                  <div style={{fontSize:13,fontWeight:500,color:'#111827'}}>{s.title}</div>
                </div>
                <div style={{fontSize:12,color:'#6b7280',marginBottom:8}}>{s.desc}</div>
                {s.code&&<div style={{background:'#1f2937',borderRadius:6,padding:'10px 12px',fontFamily:'monospace',fontSize:12,color:'#d1fae5'}}>{s.code}</div>}
                {s.items&&s.items.map((item,i)=><div key={i} style={{fontSize:12,color:'#374151',padding:'4px 0',borderBottom:i<s.items.length-1?'1px solid #f3f4f6':'none'}}>→ {item}</div>)}
              </div>
            ))}
            <div style={{fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em',color:'#9ca3af',margin:'16px 0 8px'}}>Checklist mensuelle</div>
            <div style={{border:'1px solid #e5e7eb',borderRadius:10,overflow:'hidden'}}>
              {maintenanceChecklist.map((c,i)=>(
                <div key={i} onClick={()=>setMChecks(ch=>ch.map((v,j)=>j===i?!v:v))} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 14px',borderBottom:i<maintenanceChecklist.length-1?'1px solid #f3f4f6':'none',cursor:'pointer'}}>
                  <div style={{width:16,height:16,borderRadius:4,border:`1.5px solid ${mChecks[i]?'#7c3aed':'#d1d5db'}`,background:mChecks[i]?'#7c3aed':'none',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    {mChecks[i]&&<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span style={{flex:1,fontSize:13,color:mChecks[i]?'#9ca3af':'#111827',textDecoration:mChecks[i]?'line-through':'none'}}>{c.t}</span>
                  <span style={{fontSize:11,color:'#9ca3af',background:'#f3f4f6',padding:'2px 8px',borderRadius:10}}>{c.f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
