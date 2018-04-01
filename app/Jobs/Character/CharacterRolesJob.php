<?php

namespace App\Jobs\Character;

use App\Models\Character\CharacterRoles;
use tristanpollard\ESIClient\Services\ESIClient;
use App\Jobs\AuthenticatedESIJob;

class CharacterRolesJob extends AuthenticatedESIJob{


    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->logStart();
        $client = $this->getClient();

        $response = $client->invoke("/characters/{$this->token->character_id}/roles/");
        $result = $response->get('result');

        //TODO remove removed roles.
        //TODO queue corp jobs
        //Save start time and remove all earlier??

        foreach ($result as $key => $roles){

            $location = null;
            $index = strpos($key, 'roles_at_');
            if ($index === 0){
                $location = substr($key, strlen('roles_at_'));
            }

            foreach ($roles as $role) {
                CharacterRoles::updateOrCreate(
                    ['character_id' => $this->token->character_id, 'role' => $role, 'location' => $location],
                    []
                )->touch();
            }
        }

        $this->logFinished();
    }
}
