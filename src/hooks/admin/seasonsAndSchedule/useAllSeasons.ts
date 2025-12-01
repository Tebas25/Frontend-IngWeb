import { useCallback, useState } from "react";
import type { ReturnSeasons } from "../admin";
import { fetchGetAllSeasons } from "./seasons.request";

interface ReturnUseAllSeasons {
    season: ReturnSeasons[];
    loadingSeasion: boolean;
    onSelectionChange(selectedSeasons: ReturnSeasons[]): void;
    onSelectionAllChange(checked: boolean): void;
    selectAll: boolean;
    selectedSeasons: ReturnSeasons[];
    refetchSeasons(): void;
}

export const useAllSeason = (): ReturnUseAllSeasons=> {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedSeasons, setSelectedSeasons] = useState<ReturnSeasons[]>([]);
    const [loadingSeasion, setLoadingSeasion] = useState(false);
    const [season, setSeason] = useState<ReturnSeasons[]>([]);

    const getAllSeasons = useCallback(async() => {
        setLoadingSeasion(true);
        try {
            const result = await fetchGetAllSeasons();
            setSeason(result);
        } catch (error: any) {
            setSeason([]);
        } finally {
            setLoadingSeasion(false);
        }
    }, []);


    const onSelectionChange = (selected: ReturnSeasons[]): void => {
        setSelectedSeasons(selected);
        setSelectAll(selected.length === season.length);
    };

    const onSelectionAllChange = (checked: boolean): void => {
        if (checked && season.length > 0) {
            setSelectedSeasons([...season]);
            setSelectAll(true);
        } else {
            setSelectedSeasons([]);
            setSelectAll(false);
        }
    }

    const refetchSeasons = () => {
        getAllSeasons();
    };

    return {
        season,
        loadingSeasion,
        onSelectionChange,
        onSelectionAllChange,
        selectAll,
        selectedSeasons,
        refetchSeasons
    }
}