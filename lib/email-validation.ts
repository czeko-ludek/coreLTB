/**
 * Email validation — Level 2: Typo detection + Disposable email blocking.
 *
 * 1. Levenshtein distance — finds closest known domain for typo suggestions
 * 2. Disposable email blocklist — blocks throwaway email services
 * 3. Basic structural checks beyond simple regex
 */

// ─── Known good domains (Polish + international) ─────────────────

const KNOWN_DOMAINS = [
  // Polish
  'wp.pl', 'onet.pl', 'interia.pl', 'o2.pl', 'poczta.fm',
  'gazeta.pl', 'tlen.pl', 'op.pl', 'vp.pl', 'autograf.pl',
  'buziaczek.pl', 'go2.pl', 'poczta.onet.pl',
  // International
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.pl',
  'hotmail.com', 'outlook.com', 'live.com', 'msn.com',
  'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me', 'pm.me',
  'aol.com', 'zoho.com', 'mail.com', 'gmx.com', 'gmx.net',
  'yandex.com', 'yandex.ru', 'mail.ru',
  // Business
  'firma.pl', 'home.pl',
];

// ─── Disposable email domains (top ~200) ─────────────────────────

const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com', '10minutemail.net', '20minutemail.com',
  'anonbox.net', 'binkmail.com', 'bobmail.info', 'brefmail.com',
  'bugmenot.com', 'bumpymail.com', 'casualdx.com', 'chacuo.net',
  'crazymailing.com', 'cuirderussie.com', 'dayrep.com',
  'deadaddress.com', 'despam.it', 'devnullmail.com',
  'discard.email', 'discardmail.com', 'discardmail.de',
  'disposable.email', 'disposableaddress.com', 'disposableemailaddresses.emailmiser.com',
  'disposableinbox.com', 'dispose.it', 'dm.w3internet.co.uk',
  'dodgeit.com', 'dodgit.com', 'drdrb.net', 'dump-email.info',
  'dumpanyjunk.com', 'dumpmail.de', 'dumpyemail.com',
  'e4ward.com', 'easytrashmail.com', 'einrot.com',
  'email-fake.com', 'emaildienst.de', 'emailgo.de',
  'emailias.com', 'emailigo.de', 'emailinfive.com',
  'emaillime.com', 'emailmiser.com', 'emailproxsy.com',
  'emailsensei.com', 'emailtemporario.com.br', 'emailto.de',
  'emailwarden.com', 'emailx.at.hm', 'emailxfer.com',
  'emz.net', 'enterto.com', 'ephemail.net',
  'etranquil.com', 'etranquil.net', 'etranquil.org',
  'evopo.com', 'explodemail.com', 'express.net.ua',
  'eyepaste.com', 'fakeinbox.com', 'fakeinformation.com',
  'fakemail.fr', 'fakemailgenerator.com', 'fansworldwide.de',
  'fastacura.com', 'filzmail.com', 'fizmail.com',
  'fleckens.hu', 'frapmail.com', 'fudgerub.com',
  'garliclife.com', 'get1mail.com', 'get2mail.fr',
  'getairmail.com', 'getmails.eu', 'getonemail.com',
  'getonemail.net', 'ghosttexter.de', 'girlsundertheinfluence.com',
  'gishpuppy.com', 'goemailgo.com', 'gorillaswithdirtyarmpits.com',
  'gotmail.net', 'gotmail.org', 'gotti.otherinbox.com',
  'great-host.in', 'greensloth.com', 'grr.la',
  'gsrv.co.uk', 'guerillamail.biz', 'guerillamail.com',
  'guerillamail.de', 'guerillamail.info', 'guerillamail.net',
  'guerillamail.org', 'guerrillamail.biz', 'guerrillamail.com',
  'guerrillamail.de', 'guerrillamail.info', 'guerrillamail.net',
  'guerrillamail.org', 'guerrillamailblock.com',
  'harakirimail.com', 'hartbot.de', 'hatespam.org',
  'herp.in', 'hidemail.de', 'hidzz.com',
  'hotpop.com', 'hulapla.de', 'ieatspam.eu',
  'ieatspam.info', 'imails.info', 'inbax.tk',
  'inbox.si', 'inboxalias.com', 'inboxclean.com',
  'inboxclean.org', 'incognitomail.com', 'incognitomail.net',
  'incognitomail.org', 'insorg-mail.info', 'ipoo.org',
  'irish2me.com', 'jetable.com', 'jetable.fr.nf',
  'jetable.net', 'jetable.org', 'jnxjn.com',
  'jourrapide.com', 'junk1e.com', 'kasmail.com',
  'kaspop.com', 'keepmymail.com', 'killmail.com',
  'killmail.net', 'klzlk.com', 'koszmail.pl',
  'kurzepost.de', 'lawlita.com', 'letthemeatspam.com',
  'lhsdv.com', 'lifebyfood.com', 'link2mail.net',
  'litedrop.com', 'lol.ovpn.to', 'lookugly.com',
  'lopl.co.cc', 'lortemail.dk', 'lr78.com',
  'lroid.com', 'lukop.dk', 'maboard.com',
  'mail-hierarchie.de', 'mail-temporaire.fr', 'mail.by',
  'mail.mezimages.net', 'mail.zp.ua', 'mail1a.de',
  'mail21.cc', 'mail2rss.org', 'mail333.com',
  'mail4trash.com', 'mailbidon.com', 'mailblocks.com',
  'mailcatch.com', 'maildrop.cc', 'maildrop.gq',
  'mailexpire.com', 'mailfa.tk', 'mailforspam.com',
  'mailfree.ga', 'mailfreeonline.com', 'mailguard.me',
  'mailimate.com', 'mailin8r.com', 'mailinater.com',
  'mailinator.com', 'mailinator.net', 'mailinator.org',
  'mailinator2.com', 'mailincubator.com', 'mailismagic.com',
  'mailmate.com', 'mailme.ir', 'mailme.lv',
  'mailmetrash.com', 'mailmoat.com', 'mailnator.com',
  'mailnesia.com', 'mailnull.com', 'mailorg.org',
  'mailpick.biz', 'mailrock.biz', 'mailscrap.com',
  'mailshell.com', 'mailsiphon.com', 'mailslite.com',
  'mailtemp.info', 'mailtome.de', 'mailtothis.com',
  'mailtrash.net', 'mailtv.net', 'mailtv.tv',
  'mailzilla.com', 'makemetheking.com', 'manifestgenerator.com',
  'messagebeamer.de', 'mezimages.net', 'mfsa.ru',
  'mintemail.com', 'mjukgansen.com', 'mobi.web.id',
  'mobileninja.co.uk', 'mohmal.com', 'moncourrier.fr.nf',
  'monemail.fr.nf', 'monmail.fr.nf', 'mt2015.com',
  'mx0.wwwnew.eu', 'mypartyclip.de', 'myphantom.com',
  'mysamp.de', 'mytempemail.com', 'mytempmail.com',
  'mytrashmail.com', 'nabala.com', 'neomailbox.com',
  'nepwk.com', 'nervmich.net', 'nervtansen.de',
  'netmails.com', 'netmails.net', 'neverbox.com',
  'no-spam.ws', 'nobulk.com', 'noclickemail.com',
  'nogmailspam.info', 'nomail.xl.cx', 'nomail2me.com',
  'nomorespamemails.com', 'nospam.ze.tc', 'nospam4.us',
  'nospamfor.us', 'nospammail.net', 'nothingtoseehere.ca',
  'nowmymail.com', 'nurfuerspam.de', 'nus.edu.sg',
  'nwldx.com', 'objectmail.com', 'obobbo.com',
  'onewaymail.com', 'oopi.org', 'ordinaryamerican.net',
  'otherinbox.com', 'ourklips.com', 'outlawspam.com',
  'ovpn.to', 'owlpic.com', 'pancakemail.com',
  'pookmail.com', 'proxymail.eu', 'prtnx.com',
  'putthisinyouremail.com', 'qq.com', 'quickinbox.com',
  'rcpt.at', 'reallymymail.com', 'recode.me',
  'recursor.net', 'regbypass.comsafe-mail.net',
  'safetymail.info', 'sandelf.de', 'saynotospams.com',
  'scatmail.com', 'schafmail.de', 'selfdestructingmail.com',
  'sendspamhere.com', 'sharklasers.com', 'shieldedmail.com',
  'shiftmail.com', 'shitmail.me', 'shortmail.net',
  'sibmail.com', 'skeefmail.com', 'slaskpost.se',
  'slipry.net', 'slopsbox.com', 'smashmail.de',
  'soodonims.com', 'spam.la', 'spam.su',
  'spam4.me', 'spamavert.com', 'spambob.com',
  'spambob.net', 'spambob.org', 'spambog.com',
  'spambog.de', 'spambog.ru', 'spambox.info',
  'spambox.irishspringrealty.com', 'spambox.us', 'spamcannon.com',
  'spamcannon.net', 'spamcero.com', 'spamcorptastic.com',
  'spamcowboy.com', 'spamcowboy.net', 'spamcowboy.org',
  'spamday.com', 'spamex.com', 'spamfighter.cf',
  'spamfighter.ga', 'spamfighter.gq', 'spamfighter.ml',
  'spamfighter.tk', 'spamfree.org', 'spamfree24.com',
  'spamfree24.de', 'spamfree24.eu', 'spamfree24.info',
  'spamfree24.net', 'spamfree24.org', 'spamgoes.in',
  'spamherelots.com', 'spamhereplease.com', 'spamhole.com',
  'spamify.com', 'spaminator.de', 'spamkill.info',
  'spaml.com', 'spaml.de', 'spammotel.com',
  'spamobox.com', 'spamoff.de', 'spamslicer.com',
  'spamspot.com', 'spamstack.net', 'spamthis.co.uk',
  'spamtrap.ro', 'spamtrail.com', 'spamwc.de',
  'speed.1s.fr', 'superrito.com', 'superstachel.de',
  'suremail.info', 'svk.jp', 'sweetxxx.de',
  'tafmail.com', 'teewars.org', 'teleworm.com',
  'teleworm.us', 'temp-mail.org', 'temp-mail.ru',
  'tempail.com', 'tempalias.com', 'tempe4mail.com',
  'tempemail.biz', 'tempemail.co.za', 'tempemail.com',
  'tempemail.net', 'tempinbox.com', 'tempinbox.co.uk',
  'tempmail.eu', 'tempmail.it', 'tempmail2.com',
  'tempmaildemo.com', 'tempmailer.com', 'tempomail.fr',
  'temporarily.de', 'temporarioemail.com.br', 'temporaryemail.net',
  'temporaryemail.us', 'temporaryforwarding.com', 'temporaryinbox.com',
  'temporarymailaddress.com', 'tempthe.net', 'thankyou2010.com',
  'thc.st', 'thecriminals.com', 'thejoker5.com',
  'thisisnotmyrealemail.com', 'throwam.com', 'throwaway.email',
  'throwawayemailaddress.com', 'tittbit.in', 'tizi.com',
  'tmailinator.com', 'toiea.com', 'toomail.biz',
  'topranklist.de', 'tradermail.info', 'trash-amil.com',
  'trash-mail.at', 'trash-mail.com', 'trash-mail.de',
  'trash2009.com', 'trashdevil.com', 'trashdevil.de',
  'trashmail.at', 'trashmail.com', 'trashmail.de',
  'trashmail.me', 'trashmail.net', 'trashmail.org',
  'trashmail.ws', 'trashmailer.com', 'trashymail.com',
  'trashymail.net', 'trbvm.com', 'trialmail.de',
  'trickmail.net', 'trillianpro.com', 'turual.com',
  'twinmail.de', 'tyldd.com', 'uggsrock.com',
  'umail.net', 'upliftnow.com', 'uplipht.com',
  'venompen.com', 'veryreallyme.com', 'viditag.com',
  'viewcastmedia.com', 'viewcastmedia.net', 'viewcastmedia.org',
  'vomoto.com', 'vpn.st', 'vsimcard.com',
  'vubby.com', 'wasteland.rfc822.org', 'webemail.me',
  'weg-werf-email.de', 'wegwerfadresse.de', 'wegwerfemail.com',
  'wegwerfemail.de', 'wegwerfmail.de', 'wegwerfmail.net',
  'wegwerfmail.org', 'wetrainbayarea.com', 'wetrainbayarea.org',
  'wh4f.org', 'whatiaas.com', 'whatpaas.com',
  'whyspam.me', 'wickmail.net', 'wilemail.com',
  'willhackforfood.biz', 'willselfdestruct.com', 'winemaven.info',
  'wronghead.com', 'wuzup.net', 'wuzupmail.net',
  'wwwnew.eu', 'xagloo.com', 'xemaps.com',
  'xents.com', 'xmaily.com', 'xoxy.net',
  'yep.it', 'yogamaven.com', 'yomail.info',
  'yopmail.com', 'yopmail.fr', 'yopmail.gq',
  'yopmail.net', 'yourdomain.com', 'ypmail.webarnak.fr.eu.org',
  'yuurok.com', 'zehnminutenmail.de', 'zippymail.info',
  'zoaxe.com', 'zoemail.org',
]);

// ─── Levenshtein distance ────────────────────────────────────────

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;

  // Early exits
  if (m === 0) return n;
  if (n === 0) return m;
  if (a === b) return 0;

  const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i);

  for (let i = 1; i <= m; i++) {
    let prev = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const val = Math.min(
        dp[j] + 1,      // deletion
        prev + 1,        // insertion
        dp[j - 1] + cost // substitution
      );
      dp[j - 1] = prev;
      prev = val;
    }
    dp[n] = prev;
  }

  return dp[n];
}

// ─── Public API ──────────────────────────────────────────────────

export interface EmailSuggestion {
  /** Full corrected email, e.g. "jan@gmail.com" */
  full: string;
  /** Just the suggested domain, e.g. "gmail.com" */
  domain: string;
  /** Original domain user typed, e.g. "gmial.com" */
  original: string;
}

/**
 * Check if email uses a disposable/throwaway domain.
 */
export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase().trim();
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}

/**
 * Find typo suggestion for an email domain.
 * Returns null if domain looks correct or no close match found.
 *
 * Algorithm:
 *  1. Extract domain from email
 *  2. If domain is already a known domain → no suggestion
 *  3. Find closest known domain by Levenshtein distance
 *  4. Only suggest if distance ≤ 2 (catches most typos without false positives)
 */
export function getEmailSuggestion(email: string): EmailSuggestion | null {
  if (!email || !email.includes('@')) return null;

  const parts = email.split('@');
  if (parts.length !== 2) return null;

  const [localPart, rawDomain] = parts;
  if (!localPart || !rawDomain) return null;

  const domain = rawDomain.toLowerCase().trim();

  // Already a known domain — no suggestion needed
  if (KNOWN_DOMAINS.includes(domain)) return null;

  // Also skip if it looks like a business domain (has subdomain or unusual TLD)
  // We only suggest corrections for consumer email providers
  const dotCount = domain.split('.').length - 1;
  if (dotCount > 2) return null;

  // Find closest match
  let bestMatch = '';
  let bestDistance = Infinity;

  for (const known of KNOWN_DOMAINS) {
    const dist = levenshtein(domain, known);

    // Max distance 2 — beyond that, suggestions become unreliable
    if (dist < bestDistance && dist <= 2 && dist > 0) {
      bestDistance = dist;
      bestMatch = known;
    }
  }

  if (!bestMatch) return null;

  return {
    full: `${localPart}@${bestMatch}`,
    domain: bestMatch,
    original: domain,
  };
}

/**
 * Validate email structure beyond basic regex.
 * Returns error message or null if valid.
 */
export function validateEmailStructure(email: string): string | null {
  if (!email) return null; // Email is optional in our forms

  // Basic format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Podaj prawidlowy adres e-mail';
  }

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return 'Podaj prawidlowy adres e-mail';

  // TLD must be at least 2 chars
  const tld = domain.split('.').pop();
  if (!tld || tld.length < 2) {
    return 'Nieprawidlowa domena e-mail';
  }

  // Disposable check
  if (isDisposableEmail(email)) {
    return 'Podaj staly adres e-mail — na tymczasowe nie wyslemy wyceny';
  }

  return null;
}
