import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
	const { pathname } = useLocation();
	const prevPathname = useRef(null);

	useEffect(() => {
		if (prevPathname.current !== null && prevPathname.current !== pathname) {
			// Check if the pathname doesn't contain pagination pattern (/page/)
			if (!pathname.includes("/page/")) {
				window.scrollTo(0, 0);
			}
		}
		prevPathname.current = pathname;
	}, [pathname]);

	return null; // Return null because this component doesn't render anything
};

export default ScrollToTop;
