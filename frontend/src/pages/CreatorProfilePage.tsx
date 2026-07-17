import { FormEvent, useEffect, useState } from 'react';
import { ImagePlus, UserRound } from 'lucide-react';
import { api } from '../api/api';
import { CreatorProfile } from '../types';

const defaultProfile: CreatorProfile = {
  display_name: 'Ava Creator',
  niche: 'Education & growth',
  bio: 'Helping creators grow with tools, workflows, and meaningful insights.',
  country: 'United States',
  primary_platform: 'YouTube',
};

export default function CreatorProfilePage() {
  const [profile, setProfile] = useState<CreatorProfile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(defaultProfile.avatar_url ?? null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.getCreatorProfile();
        const nextProfile = {
          ...defaultProfile,
          ...response,
        };
        setProfile(nextProfile);
        setAvatarPreview(nextProfile.avatar_url ?? null);
      } catch (error) {
        console.warn('Creator profile not found yet:', error);
        setProfile(defaultProfile);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const savedProfile = await api.saveCreatorProfile({
        display_name: profile.display_name,
        niche: profile.niche,
        bio: profile.bio,
        country: profile.country,
        primary_platform: profile.primary_platform,
        avatar_url: avatarPreview ?? profile.avatar_url,
      });
      setProfile({ ...profile, ...savedProfile });
      setMessage('Profile saved successfully.');
    } catch (error) {
      console.error('Profile save failed:', error);
      setMessage(error instanceof Error ? error.message : 'Unable to save profile right now.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        <div style={{ fontSize: '1.5rem', color: '#64748b' }}>👤 Loading your profile...</div>
      </div>
    );
  }

  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <h1 className="page-title">Creator profile</h1>
        <p style={{ margin: 0, color: '#64748b' }}>
          Update your creator details and connected platforms.
        </p>
      </header>

      <form className="card form-card" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', overflow: 'hidden', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {avatarPreview ? <img src={avatarPreview} alt="Profile avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <UserRound size={34} color="#475569" />}
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="avatar" className="button secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <ImagePlus size={16} /> Add profile picture
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const dataUrl = typeof reader.result === 'string' ? reader.result : null;
                  setAvatarPreview(dataUrl);
                };
                reader.readAsDataURL(file);
              }}
            />
            <div style={{ marginTop: 8, color: '#64748b', fontSize: '0.9rem' }}>You can upload a profile image or add a direct image URL below.</div>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="avatar-url">Avatar image URL</label>
          <input id="avatar-url" type="url" value={avatarPreview ?? ''} onChange={(event) => setAvatarPreview(event.target.value)} />
        </div>

        <div className="form-field">
          <label htmlFor="name">Creator name</label>
          <input id="name" type="text" value={profile.display_name} onChange={(event) => setProfile((current) => ({ ...current, display_name: event.target.value }))} />
        </div>
        <div className="form-field">
          <label htmlFor="niche">Niche</label>
          <input id="niche" type="text" value={profile.niche} onChange={(event) => setProfile((current) => ({ ...current, niche: event.target.value }))} />
        </div>
        <div className="form-field">
          <label htmlFor="primary-platform">Primary platform</label>
          <input id="primary-platform" type="text" value={profile.primary_platform ?? ''} onChange={(event) => setProfile((current) => ({ ...current, primary_platform: event.target.value }))} />
        </div>
        <div className="form-field">
          <label htmlFor="country">Country</label>
          <input id="country" type="text" value={profile.country ?? ''} onChange={(event) => setProfile((current) => ({ ...current, country: event.target.value }))} />
        </div>
        <div className="form-field">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" rows={5} value={profile.bio} onChange={(event) => setProfile((current) => ({ ...current, bio: event.target.value }))} />
        </div>
        {message && (
          <p style={{ marginBottom: 16, color: message.startsWith('Profile saved') ? '#0f766e' : '#b91c1c', fontWeight: 700 }}>
            {message}
          </p>
        )}
        <button className="button primary" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save profile'}
        </button>
      </form>
    </div>
  );
}
