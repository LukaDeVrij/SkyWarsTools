import { fetchAdminData } from '@/app/utils/Utils';
import React from 'react'

const MapRotationCheck = ({ profileToken }: { profileToken: string }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	// Helper function to handle download with isoDate
	const handlePostRequest = async () => {
		if (!profileToken) return;
		setLoading(true);
		setError(null);
		try {
			
			const data = await fetchAdminData(profileToken, `mapRotationCheck`, "POST");
      console.log(data)
		} catch (err: unknown) {
			setError("Failed: " + err);
			console.error(err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="w-full max-w bg-layer rounded-xl shadow p-4 flex flex-col justify-center items-center gap-2">
      <h1>Map rotation force check</h1>
			<button
				className="bg-green-800 px-2 py-1 rounded-xl cursor-pointer"
				onClick={() => handlePostRequest()}
			>
				{loading ? "Loading..." : "Post to endpoint"}
			</button>
			{error && <div style={{ color: "red" }}>{error}</div>}
		</div>
	);
}

export default MapRotationCheck
