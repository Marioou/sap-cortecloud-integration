import crypto from 'crypto';

export class EncryptionUtil {
    private static readonly algorithm = 'aes-256-gcm';
    private static readonly key = process.env.ENCRYPTION_KEY || 'default-key-32-chars-required-here';

    static encrypt(text: string): string {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return `${iv.toString('hex')}:${encrypted}:${cipher.getAuthTag().toString('hex')}`;
    }

    static decrypt(encryptedText: string): string {
        const [ivHex, encrypted, authTagHex] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        decipher.setAuthTag(authTag);
        
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }
}
