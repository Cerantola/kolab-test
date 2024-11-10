export default function Skeleton() {
    return (
        <div className="w-full flex flex-col p-5 gap-5 bg-white rounded-md shadow-md">
            <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-gray-400 animate-pulse" />

                <div className="flex flex-col gap-2">
                    <div className="w-[200px] h-3 bg-gray-400 rounded-md animate-pulse" />
                </div>
            </div>

            <div className="w-full h-4 bg-gray-400 rounded-md animate-pulse" />

            <div className="w-full h-[300px] md:h-[479px] bg-gray-400 rounded-md animate-pulse" />
        </div>
    );
}
