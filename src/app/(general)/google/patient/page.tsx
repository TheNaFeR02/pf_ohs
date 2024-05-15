
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'


async function getGooglePatient(access_token: string) {

  console.log("google access token:", access_token)

  const res = await fetch('https://healthcare.googleapis.com/v1/projects/pf-ohs/locations/northamerica-northeast1/datasets/pf-ohs-test/fhirStores/pf-ohs-datastore/fhir/Patient/4e9adcae-4277-42c4-8fe7-85ec5c1d4734/\$everything', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  })

  console.log("google patient response:", res)
  
}


export default async function GoogleFHIRPatientPage() {
  const session = await getServerSession(options)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }  

  const patient = await getGooglePatient(session.user.access_token);

  return (
    <div>
      <h1>Google FHIR Patient Page</h1>
      <pre>{JSON.stringify(patient, null, 2)}</pre>
    </div>
  );
}