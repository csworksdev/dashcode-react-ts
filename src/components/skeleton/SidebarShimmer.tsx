const SidebarShimmer = () => {

    function getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    return (
        <>
            {
                [1, 2, 3, 4, 5].map((item: any) => {
                    return (
                        <div key={item}>
                        <div className="py-2 animate-pulse">
                            <div className="animate" style={{ height: 30, width: '100%', borderRadius: 7 }}></div>
                        </div>
                        <div className="py-2 animate-pulse">
                            <div className="animate" style={{ height: 30, width: getRandomArbitrary(50, 80) + '0%', borderRadius: 7 }}></div>
                        </div>
                        </div>
                    )
                })
            }

        </>
    )
};
export default SidebarShimmer;