<?php

namespace App\Jobs\Character;

use App\Models\Character\CharacterClone;
use tristanpollard\ESIClient\Services\ESIClient;
use App\Jobs\AuthenticatedESIJob;

class CharacterClonesJob extends AuthenticatedESIJob
{

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->logStart();

        $client = $this->getClient();
        $response = $client->invoke("/characters/{$this->token->character_id}/clones");

        $clones = $response->get('result');

        if (!empty($clones['jump_clones'])) {
            DB::transaction(function ($db) use ($clones) {
                $clones = collect($clones['jump_clones']);
                CharacterClone::whereNotIn('jump_clone_id', $clones)->where('character_id', $this->getId())->delete();
                foreach ($clones as $clone) {
                    $clone = collect($clone);
                    $implants = $clone->pull('implants');

                    CharacterClone::updateOrCreate([
                        'character_id' => $this->token->character_id,
                        'jump_clone_id' => $clone->get('jump_clone_id')
                    ],
                        $clone->toArray()
                    );
                }
            });
        }

        $this->logFinished();
    }
}
