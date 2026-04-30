interface EmailPayload {
  subject: string;
  formData: Record<string, unknown>;
  formType: 'consultation' | 'contact' | 'callback' | 'lead_report';
  metadata?: UserMetadata;
}

interface UserMetadata {
  ip: string;
  city: string;
  country: string;
  isp: string;
  userAgent: string;
  timestamp: string;
}

interface IpapiResponse {
  ip: string;
  city: string;
  country_name: string;
  org: string;
}

const WP_API_ENDPOINT = 'https://www.brightpathnepal.com/wp-json/brightpath/v1/send-mail';

async function getMetadata(): Promise<UserMetadata> {
  const metadata: UserMetadata = {
    ip: 'Unknown',
    city: 'Unknown',
    country: 'Unknown',
    isp: 'Unknown',
    userAgent: navigator.userAgent,
    timestamp: new Date().toLocaleString(),
  };

  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = (await response.json()) as IpapiResponse;
      metadata.ip = data.ip;
      metadata.city = data.city;
      metadata.country = data.country_name;
      metadata.isp = data.org;
    }
  } catch (error) {
    console.warn('Could not fetch IP metadata:', error);
  }

  return metadata;
}

export const submitForm = async (payload: EmailPayload): Promise<boolean> => {
  try {
    const metadata = await getMetadata();

    const response = await fetch(WP_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, metadata }),
    });

    if (!response.ok) {
      if (
        window.location.hostname === 'localhost' ||
        window.location.hostname.includes('webcontainer')
      ) {
        console.log('Simulating email send for:', payload.subject);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return true;
      }
      throw new Error('API unreachable');
    }

    const result = (await response.json()) as { status: string };
    return result.status === 'success';
  } catch (error) {
    console.error('Submission failed:', error);
    return false;
  }
};