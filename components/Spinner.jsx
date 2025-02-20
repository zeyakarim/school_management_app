const Spinner = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-100/60 z-[1400]">
			<div className="w-12 h-12 border-4 border-[#34bff3] border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
};

export default Spinner;
