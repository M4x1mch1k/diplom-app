export function validateIbanChecksum(iban: string): boolean {
    const ibanStripped = iban.replace(/[^A-Z0-9]+/gi, '').toUpperCase();
    const m = ibanStripped.match(/^([A-Z]{2})([0-9]{2})([A-Z0-9]{9,30})$/);
    if (!m) return false;
  
    const numberised = (m[3] + m[1] + m[2]).replace(/[A-Z]/g, ch => {
      return (ch.charCodeAt(0) - 55).toString();
    });
  
    let remainder = numberised.match(/\d{1,7}/g)?.reduce((total, curr) => {
      return (BigInt(total + curr) % BigInt(97)).toString();
    },'0') || '0';

    console.log(remainder);
    return remainder === '1';
};